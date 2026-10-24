const app = require('./app');

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Practical 12 Server running on port ${PORT} - Student: Jashkumar Baldha (24CE004)`);
});
