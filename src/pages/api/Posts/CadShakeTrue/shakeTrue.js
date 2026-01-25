// Este endpoint foi unificado em /api/Posts/CadShake/shakeOptions
// Redirecionando para o endpoint unificado...
import createShakes from '../CadShake/shakeOptions';

export default async function handler(req, res) {
  // Redireciona para o endpoint unificado
  return createShakes(req, res);
}
