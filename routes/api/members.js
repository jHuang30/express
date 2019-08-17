const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const members = require("../..//Members");

//get all members
router.get("/", (req, res) => {
  res.json(members);
});

//get single member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `user not found of id:${req.params.id}` });
  }
});

//post/crate a user
router.post("/", (req, res) => {
  // res.send(req.body);
  const newMember = {
    id: uuid.v4(), //if use database, will created for us
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "please include name and email" });
  }

  members.push(newMember);
  res.json(members);
});

//updte a member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({ msg: "member is updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `user not found of id:${req.params.id}` });
  }
});

//delete
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "member deleted",
      member: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `user not found of id:${req.params.id}` });
  }
});

module.exports = router;
