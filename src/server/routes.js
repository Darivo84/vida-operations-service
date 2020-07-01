import fetch from 'node-fetch';
import getWeek from 'date-fns/getWeek';
import { Op } from 'sequelize';
import { Appointment } from '#root/db/models';

const fetchAppointmentsByWeek = ({ token, week, page }) =>
  fetch(
    `https://api.care-planner.co.uk/appointments/2020/${week}?limit=100&page=${page}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'CP-Org-Name': 'vida',
      },
    }
  ).then(response => response.json());

const setupRoutes = app => {
  app.get('/fetch-all-appointments', async (req, res, next) => {
    let week = getWeek(new Date());
    const weekMax = week + 5;
    let page = 0;
    let body = await fetchAppointmentsByWeek({ token: req.token, week, page });

    let allAppointments = body.appointments;

    while (week <= weekMax || body.appointments.length === 100) {
      page++;

      body = await fetchAppointmentsByWeek({ token: req.token, week, page });

      console.log(
        `https://api.care-planner.co.uk/appointments/2020/${week}?limit=100&page=${page}`,
        body.appointments.length,
        week <= weekMax
      );

      if (body.appointments.length < 100 && week <= weekMax) {
        page = 0;
        week++;
      }

      allAppointments = [...allAppointments, ...body.appointments];
    }

    allAppointments.map(async (appointment, index) => {
      const newAppointment = await Appointment.create({
        identifier: appointment.identifier,
        client: appointment.client,
        carer:
          appointment.carers.length !== 0 ? appointment.carers[0].carer : '',
        startDate: appointment.dates.start,
        endDate: appointment.dates.end,
        checkInDate:
          appointment.carers.length !== 0
            ? appointment.carers[0].times.start
            : '',
        checkOutDate:
          appointment.carers.length !== 0
            ? appointment.carers[0].times.end
            : '',
        notesPublic: appointment.notes.public,
        notesPrivate: appointment.notes.private,
        cancelled: appointment.cancelled,
        cancellationReason:
          appointment.cancellationReason !== null
            ? appointment.cancellationReason.name
            : '',
      });
      console.log(`Added new appointment ${index}`);
    });

    console.log('Data successfully refreshed!');
    return res.json(body);
  });

  app.get('/appointments', async (req, res, next) => {
    if (!req.query.start || !req.query.end) {
      return next(new Error('Invalid body!'));
    }
    const { start, end } = req.query;

    console.log('range', start, end);
    try {
      const appointments = await Appointment.findAll({
        where: {
          startDate: {
            [Op.between]: [new Date(start), new Date(end)],
          },
        },
      });
      console.log(appointments.length);
      return res.json(appointments);
    } catch (e) {
      return next(e);
    }
  });
};

export default setupRoutes;
