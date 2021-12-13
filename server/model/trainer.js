const db = require('../db/index.js');

async function getUsers() {
  const { rows } = await db.query('SELECT * FROM users;');
  return {
    code: 200,
    data: rows,
  };
}

async function addUser(
  user_firstname,
  user_lastname,
  user_birthday,
  user_email,
  user_password,
  user_activitylevel,
) {
  await db.query(
    'insert into users(user_firstname, user_lastname,user_birthday,user_activitylevel,user_email,user_password,) values ($1,$2,$3,$4,$5,$6);',
    [user_firstname, user_lastname, user_birthday, user_activitylevel, user_email, user_password],
  );
}

async function editUser(user_data, id) {
  let upd = [];
  for (key in user_data) upd.push(`${key} = '${user_data[key]}'`);
  const cmd = 'UPDATE users SET ' + upd.join(', ') + ' WHERE user_id = $1';
  await db.query(cmd, [id]);
}

async function deleteUser(id) {
  await db.query('delete from user_plan where user_id = $1;', [id]);
  await db.query('delete from sessions where user_id = $1;', [id]);
  const { rowCount } = await db.query('delete from users where user_id = $1;', [id]);

  console.log(rowCount);
  if (rowCount === 1) {
    return {
      code: 200,
      data: 'User deleted',
    };
  }
  return {
    code: 404,
    data: `User with id ${id} wasnt found.`,
  };
}

async function getUserByEmail(user_email) {
  const { rows } = await db.query('select user_password, user_email from users where user_email = $1;', [
    user_email,
  ]);
  return {
    code: 200,
    data: rows,
  };
}

async function getPlans() {
  const { rows } = await db.query('SELECT * FROM plans;');
  return {
    code: 200,
    data: rows,
  };
}

async function addPlan(plan_desc, plan_title, plan_type, plan_price) {
  await db.query('insert into plans(plan_desc, plan_title, plan_type, plan_price) values ($1,$2,$3,$4);', [
    plan_desc,
    plan_title,
    plan_type,
    plan_price,
  ]);
}

async function editPlan(plan_data, id) {
  let upd = [];
  for (key in plan_data) upd.push(`${key} = '${plan_data[key]}'`);
  const cmd = 'UPDATE plans SET ' + upd.join(', ') + ' WHERE plan_id = $1';
  await db.query(cmd, [id]);
}

async function deletePlan(id) {
  await db.query('delete from sessions where plan_id = $1;', [id]);
  await db.query('delete from user_plan where plan_id = $1;', [id]);
  const { rowCount } = await db.query('delete from plans where plan_id = $1;', [id]);
  console.log(rowCount);
  if (rowCount === 1) {
    return {
      code: 200,
      data: 'Plan deleted',
    };
  }
  return {
    code: 404,
    data: `Plan with id ${id} wasnt found.`,
  };
}

async function getSessions() {
  const { rows } = await db.query(
    'SELECT u.user_firstname, u.user_lastname, s.session_date, s.session_period, p.plan_title, s.accepted from sessions s join users u on s.user_id = u.user_id join plans p on s.plan_id = p.plan_id;',
  );
  return {
    code: 200,
    data: rows,
  };
}

async function addSession(session_period, session_date, plan_id, user_id, accepted) {
  await db.query(
    'insert into sessions(session_period, session_date, plan_id, user_id, accepted) values ($1,$2,$3,$4,$5);',
    [session_period, session_date, plan_id, user_id, accepted],
  );
}

async function editSession(session_data, id) {
  let upd = [];
  for (key in session_data) upd.push(`${key} = '${session_data[key]}'`);
  const cmd = 'UPDATE sessions SET ' + upd.join(', ') + ' WHERE session_id = $1';
  await db.query(cmd, [id]);
}

async function deleteSession(id) {
  const { rowCount } = await db.query('delete from sessions where session_id = $1;', [id]);
  console.log(rowCount);
  if (rowCount === 1) {
    return {
      code: 200,
      data: 'Session deleted',
    };
  }
  return {
    code: 404,
    data: `Session with id ${id} wasnt found.`,
  };
}

module.exports = {
  getUsers,
  getSessions,
  getPlans,
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
