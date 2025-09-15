
import dotenv from 'dotenv';

dotenv.config();

export const SOLANA_RPC_URL = process.env.RPC_URL ? process.env.RPC_URL : "mainnet";
export const PROJECT_WALLET = process.env.PROJECT_WALLET ? process.env.PROJECT_WALLET : "3Qdx5ybMHxksJtYERhXGwWLzhRREfEYjshggvB69MbXC";
export const TRANSACTION_TIMEOUT = 30000;
export const BLOCK_ENGINE_URL = process.env.BLOCK_ENGINE_URL ? process.env.BLOCK_ENGINE_URL : "amsterdam.mainnet.block-engine.jito.wtf";
export const JITO_BUNDLE_TIP = process.env.JITO_BUNDLE_TIP ? parseFloat(process.env.JITO_BUNDLE_TIP) : 0.0005;

export const ComputeUnitLimit = process.env.ComputeUnitLimit ? parseInt(process.env.ComputeUnitLimit) : 300000;
export const ComputeUnitPrice = process.env.ComputeUnitPrice ? parseInt(process.env.ComputeUnitPrice) : 10000000;

export const JITO_FLAG = process.env.JITO_FLAG ? process.env.JITO_FLAG : 1;