
import dotenv from 'dotenv';

dotenv.config();

export const BOT_TOKEN = process.env.BOT_TOKEN ? process.env.BOT_TOKEN : "";
export const BOT_FEE = process.env.BOT_FEE ? parseFloat(process.env.BOT_FEE) : 1; //percentage
export const BOT_MIN_FEE = process.env.BOT_MIN_FEE ? parseFloat(process.env.BOT_MIN_FEE) : 0.01; //percentage
export const BOT_FEE_WALLET = process.env.BOT_FEE_WALLET ? process.env.BOT_FEE_WALLET : "3Qdx5ybMHxksJtYERhXGwWLzhRREfEYjshggvB69MbXC";
export const DB_URL = process.env.DB_URL ? process.env.DB_URL : "";
export const SOLANA_RPC_URL = process.env.RPC_URL ? process.env.RPC_URL : "mainnet";
export const PROJECT_WALLET = process.env.PROJECT_WALLET ? process.env.PROJECT_WALLET : "3Qdx5ybMHxksJtYERhXGwWLzhRREfEYjshggvB69MbXC";
export const SLIPPAGE = process.env.SLIPPAGE ? parseFloat(process.env.SLIPPAGE) : 0.1;
export const TRANSACTION_TIMEOUT = 30000;
export const BLOCK_ENGINE_URL = process.env.BLOCK_ENGINE_URL ? process.env.BLOCK_ENGINE_URL : "amsterdam.mainnet.block-engine.jito.wtf";
export const JITO_BUNDLE_TIP = process.env.JITO_BUNDLE_TIP ? parseFloat(process.env.JITO_BUNDLE_TIP) : 0.0005;

export const CPMM_AMM_CONFIG_ID = [
    "2fGXL8uhqxJ4tpgtosHZXT4zcQap6j62z3bMDxdkMvy5",
    "C7Cx2pMLtjybS3mDKSfsBj4zQ3PRZGkKt7RCYTTbCSx2",
    "G95xxie3XbkCqtE39GgQ9Ggc7xBC8Uceve7HFDEFApkc",
    "D4FPEruKEHrG5TenZ2mpDGEfu1iUvTiqBxvpU8HLBvC2"
];

export const CLMM_AMM_CONFIG_ID = [
    "9iFER3bpjf1PTTCQCfTRu17EJgvsxo9pVyA9QWwEuX4x",
    "EdPxg8QaeFSrTYqdWJn6Kezwy9McWncTYueD9eMGCuzR",
    "9EeWRCL8CJnikDFCDzG8rtmBs5KQR1jEYKCR5rRZ2NEi",
    "3h2e43PunVA5K34vwKCLHWhZF4aZpyaC9RmxvshGAQpL",
    "3XCQJQryqpDvvZBfGxR7CLAw5dpGJ9aa7kt1jRLdyxuZ",
    "E64NGkDLLCdQ2yFNPcavaKptrEgmiQaNykUuLC1Qgwyp",
    "A1BBtTYJd4i3xU8D6Tc2FzU6ZN4oXZWXKZnCxwbHXr8x",
    "Gex2NJRS3jVLPfbzSFM5d5DRsNoL5ynnwT1TXoDEhanz"
];

export const ComputeUnitLimit = process.env.ComputeUnitLimit ? parseInt(process.env.ComputeUnitLimit) : 300000;
export const ComputeUnitPrice = process.env.ComputeUnitPrice ? parseInt(process.env.ComputeUnitPrice) : 10000000;

export const DEV_WALLET_KEY = process.env.DEV_BONUS_WALLET ? process.env.DEV_BONUS_WALLET : "";

export const TOTAL_WORK_WALLET_COUNT = process.env.TOTAL_WORK_WALLET_COUNT ? parseInt(process.env.TOTAL_WORK_WALLET_COUNT) : 10000;
export const MAX_WALLET_COUNT = 10000;
export const MAKER_BOT_MAX_PER_TX = 4;
export const VOLUME_BOT_MIN_HOLD_SOL = 0.2;
export const VOLUME_BOT_MAX_PERCENTAGE = 1;
export const VOLUME_BOT_MIN_PERCENTAGE = 0.6;
export const VOLUME_FEE_PAY_STEP = 100;
export const VOLUME_FEE_AMOUNT = 0.001;

export const UPDATE_MSG_INTERVAL = 10;

export enum BOT_STATUS {
    BOT_STOP,
    BOT_RUNNING
}
