const allowedCors = [
  'https://api.fmkrom.students.nomoredomains.icu',
  'http://api.fmkrom.students.nomoredomains.icu',
  'https://http://fmkrom.students.nomoredomains.club',
  'http://http://fmkrom.students.nomoredomains.club',
  'http://localhost:3000',
  'http://localhost:3005',
];

/* Для разрешения запросов со всех доменов:

app.use(
  cors({
   origin: true,
   exposedHeaders: '*'
   credentials: true,
  })
)
*/

module.exports = { allowedCors };
