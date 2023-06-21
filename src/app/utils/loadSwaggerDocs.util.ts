import fs from 'fs'
import YAML from 'yaml'

const file = fs.readFileSync('docs/Swagger-Docs.yml', 'utf-8')
const swaggerDocument = YAML.parse(file)

export default swaggerDocument
