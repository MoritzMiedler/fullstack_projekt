const asyncHandler = require('express-async-handler');
const trainerModel = require('../model/trainer.js');

const getUsers = asyncHandler(async (req, res) => {
  const { code, data } = await trainerModel.getUsers();
  res.status(code).json(data);
});

const getUserByEmail = asyncHandler(async (req, res) => {
  await trainerModel.getUserByEmail(req.body.user_email);
});

const addUser = asyncHandler(async (req, res) => {
  await trainerModel.addUser(
    req.body.user_firstname,
    req.body.user_lastname,
    req.body.user_birthday,
    req.body.user_activitylevel,
    req.body.user_email,
    req.body.user_password,
  );
});

const editUser = asyncHandler(async (req, res) => {
  await trainerModel.editUser(req.body, req.params.id);
});

const deleteUser = asyncHandler(async (req, res) => {
  const { code, data } = await trainerModel.deleteUser(req.params.id);
  res.status(code).json(data);
});

const getPlans = asyncHandler(async (req, res) => {
  const { code, data } = await trainerModel.getPlans();
  res.status(code).json(data);
});

const addPlan = asyncHandler(async (req, res) => {
  await trainerModel.addPlan(
    req.body.plan_description,
    req.body.plan_name,
    req.body.plan_duration,
    req.body.plan_type,
    req.body.plan_price,
  );
});

const editPlan = asyncHandler(async (req, res) => {
  await trainerModel.editPlan(req.body, req.params.id);
});

const deletePlan = asyncHandler(async (req, res) => {
  const { code, data } = await trainerModel.deletePlan(req.params.id);
  res.status(code).json(data);
});

const getSessions = asyncHandler(async (req, res) => {
  const { code, data } = await trainerModel.getSessions(req.params.id);
  res.status(code).json(data);
});

const addSession = asyncHandler(async (req, res) => {
  await trainerModel.addSession(
    req.body.session_period,
    req.body.session_date,
    req.body.plan_id,
    req.body.user_id,
    req.body.accepted,
  );
});

const editSession = asyncHandler(async (req, res) => {
  await trainerModel.editSession(req.body, req.params.id);
});

const deleteSession = asyncHandler(async (req, res) => {
  const { code, data } = await trainerModel.deleteSession(req.params.id);
  res.status(code).json(data);
});

module.exports = {
  getUsers,
  getPlans,
  getSessions,
  addUser,
  editUser,
  deleteUser,
  addPlan,
  editPlan,
  deletePlan,
  addSession,
  editSession,
  deleteSession,
  getUserByEmail,
};
