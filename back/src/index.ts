import Fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const app = Fastify();
const PORT = process.env.PORT || 3000;

app.get('/api/ping', async () => {
  return { pong: "cela fonctionne !" };
});

app.listen({ port: Number(PORT), host: '0.0.0.0' }, () => {
  console.log(`🚀 Server ready on http://localhost:${PORT}`);
});
