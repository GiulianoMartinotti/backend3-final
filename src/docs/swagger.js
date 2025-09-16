import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const specPath = path.join(__dirname, 'users.yaml');
const openapiSpec = YAML.load(specPath);

export const swaggerMiddleware = [
  swaggerUi.serve,
  swaggerUi.setup(openapiSpec, { explorer: true }),
];
