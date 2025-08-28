import sql from "../config/db.js";

export const addTransaction = async (req, res, next) => {
    try {
        const { title, user_id, category, amount } = req.body;

        if (!title || !user_id || !category || amount === undefined)
            return res
                .status(400)
                .json({ success: false, message: "All fields are required", data: [] });
        const transactions = await sql`
        INSERT INTO transactions (user_id,title,amount,category) VALUES (${user_id},${title},${amount},${category}) RETURNING *`;
        return res
            .status(201)
            .json({
                success: true,
                message: "Transaction Added",
                data: transactions,
            });
    } catch (error) {
        console.log(`ERROR WHILE CREATING TRANSACTIONS`, error);
        return res
            .status(500)
            .json({ success: false, message: error.message, data: [] });
    }
}

export const getUserTransactions = async (req, res, next) => {
    try {
        const { userId } = req.params;
        console.log(userId)
        if (!userId)
            return res
                .status(400)
                .json({ success: false, message: "UNAUTHORIZED", data: [] });

        const transactions =
            await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
        return res
            .status(200)
            .json({
                success: true,
                message: "Fetched transactions",
                data: transactions,
            });
    } catch (error) {
        console.log(`ERROR WHILE GETTING TRANSACTIONS`, error);
        return res
            .status(500)
            .json({ success: false, message: error.message, data: [] });
    }
}

export const deleteTransaction = async (req, res, next) => {
    try {
        const { transactionId } = req.params;
        if (isNaN(Number(transactionId)))
            return res
                .status(400)
                .json({ success: false, message: "Invalid transaction ", data: [] });
        const result =
            await sql`DELETE FROM transactions WHERE id = ${transactionId} RETURNING *`;
        if (result.length === 0)
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Transaction does not exist",
                    data: [],
                });
        return res
            .status(200)
            .json({ success: true, message: "Deleted transaction ", data: result });
    } catch (error) {
        console.log(`ERROR WHILE DELETING TRANSACTIONS`, error);
        return res
            .status(500)
            .json({ success: false, message: error.message, data: [] });
    }
}
export const getTransactionSummary = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId)
        const balanceResult = await sql`
        SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${userId}`;
        const incomeResult = await sql`
        SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0`;
        const expenseResult = await sql`
        SELECT COALESCE(SUM(amount),0) as expense FROM transactions WHERE user_id = ${userId} AND amount<0`;
        return res.status(200).json({
            success: true,
            message: "TRANSACTION SUMMARY FETCHED",
            data: {
                balance: balanceResult[0].balance,
                income: incomeResult[0].income,
                expense: expenseResult[0].expense,
            },
        });
    } catch (error) {
        console.log(`ERROR WHILE GETTING TRANSACTIONS SUMMARY`, error);
        return res
            .status(500)
            .json({ success: false, message: error.message, data: [] });
    }
}

