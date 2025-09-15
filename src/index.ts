import axios from 'axios';

import {
    Keypair,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    ComputeBudgetProgram,
    TransactionMessage,
    sendAndConfirmRawTransaction,
    TransactionInstruction,
    VersionedTransaction,
    SystemProgram,
} from "@solana/web3.js";

import bs58 from 'bs58';

import {
    BLOCK_ENGINE_URL,
    ComputeUnitLimit,
    ComputeUnitPrice,
    JITO_BUNDLE_TIP,
    JITO_FLAG,
    SOLANA_RPC_URL
} from './constant';

export const connections: Connection[] = [];
export let connectionIdx = 0;

export const initConnections = () => {
    connections.push(new Connection(SOLANA_RPC_URL, "confirmed"));
    connections.push(new Connection('https://mainnet.helius-rpc.com/?api-key=71f7bb94-b1e9-4535-9f2c-db547e77ffff', "confirmed"));
    connections.push(new Connection('https://mainnet.helius-rpc.com/?api-key=5f3f3211-7b12-4fc2-814c-f9a707d0c8a5', "confirmed"));
    connections.push(new Connection('https://mainnet.helius-rpc.com/?api-key=af93871a-cf79-4783-95d1-33c15dc5694a', "confirmed"));
}

initConnections();

export const getConnection = () => {
    connectionIdx = (connectionIdx + 1) % connections.length;
    return connections[0];
}

export async function sendAdvancedTransaction(walletKey: string, instrunctions: any[]) {

    try {
        const walletKeypair = Keypair.fromSecretKey(bs58.decode(walletKey));

        if (JITO_FLAG) {
            instrunctions.push(
                ComputeBudgetProgram.setComputeUnitLimit({
                    units: ComputeUnitLimit
                }),
                ComputeBudgetProgram.setComputeUnitPrice({
                    microLamports: ComputeUnitPrice
                })
            );
        } else {
            const tipInstruction = getTipInstruction(walletKeypair.publicKey, JITO_BUNDLE_TIP);
            instrunctions.push(tipInstruction);
        }

        const connection = getConnection();

        const txFinal = await makeVersionedTransactions(connection, walletKeypair, instrunctions);

        txFinal.sign([walletKeypair]);

        let hash = '';

        if (JITO_FLAG) {
            createAndSendBundle([txFinal]);
        } else {
            hash = await connection.sendTransaction(txFinal);

            await connection.confirmTransaction(hash, 'confirmed');
        }

        return { result: true, txhash: hash };
    } catch (e) {
        console.log("err", e);
    }

    return { result: false, txhash: null };
}

export const createAndSendBundle = async (bundleTransactions: VersionedTransaction[]) => {
    try {

        const rawTxns = bundleTransactions.map(item => bs58.encode(item.serialize()));

        const { data: bundleRes } = await axios.post(`https://${BLOCK_ENGINE_URL}/api/v1/bundles`,
            {
                jsonrpc: "2.0",
                id: 1,
                method: "sendBundle",
                params: [
                    rawTxns
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!bundleRes) {
            return false;
        }

        const bundleUUID = bundleRes.result;
        console.log("Bundle sent.");
        console.log("Bundle UUID:", bundleUUID);

        return true;

        // const res = await checkBundle(bundleUUID);

        // return res;
    } catch (error) {
        console.error("Error creating and sending bundle.", error);

    }
    return false;
};

export async function getTipInstruction(
    ownerPubkey: PublicKey,
    tip: number
) {
    try {
        const tipAddrs = ["DfXygSm4jCyNCybVYYK6DwvWqjKee8pbDmJGcLWNDXjh"];
        console.log("Adding tip transactions...", tip);

        const tipAccount = new PublicKey(tipAddrs[0]);
        const instruction =
            SystemProgram.transfer({
                fromPubkey: ownerPubkey,
                toPubkey: tipAccount,
                lamports: LAMPORTS_PER_SOL * tip,
            })

        return instruction;
    }
    catch (err) {
        console.log(err);
    }
    return null;
}

export async function getSolBalance(publicKey: string) {

    const wallet = new PublicKey(publicKey);

    const balance = await getConnection().getBalance(wallet);

    return balance / LAMPORTS_PER_SOL;
}

export const makeVersionedTransactions = async (
    connection: Connection,
    signer: Keypair,
    instructions: TransactionInstruction[]
) => {

    let latestBlockhash = await connection.getLatestBlockhash();

    // Compiles and signs the transaction message with the sender's Keypair.
    const messageV0 = new TransactionMessage({
        payerKey: signer.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: instructions,
    }).compileToV0Message();

    const versionedTransaction = new VersionedTransaction(messageV0);
    versionedTransaction.sign([signer]);
    return versionedTransaction;
};