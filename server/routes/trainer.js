const express = require('express');
const {
  getUsers,
  getPlans,
  getSessions,
  editUser,
  editPlan,
  editSession,
  deleteUser,
  deletePlan,
  deleteSession,
  addUser,
  addPlan,
  addSession,
  getUserByEmail,
} = require('../controllers/trainer');

const router = express.Router();

//user routes
router.get('/users', getUsers);
router.patch('/users/:id', editUser);
router.delete('/users/:id', deleteUser);
router.post('/users', addUser);
//get user via email
router.get('/user', getUserByEmail);

//plan routes
router.get('/plans', getPlans);
router.patch('/plans/:id', editPlan);
router.delete('/plans/:id', deletePlan);
router.post('/plans', addPlan);

//session routes
router.get('/sessions/:id', getSessions);
router.patch('/sessions/:id', editSession);
router.delete('/sessions/:id', deleteSession);
router.post('/sessions', addSession);

module.exports = router;
