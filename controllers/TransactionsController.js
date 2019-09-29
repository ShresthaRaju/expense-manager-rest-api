import Transaction from '../models/Transaction';
import Validation from '../requests/Validation';
import UserController from './UserController';

class TransactionsController {

    // add a new Transasction [Expense/Income]
    async newTransaction(request, response) {
        const result = Validation.NEWTRANSACTION(request.body);

        if (result.error) {
            let error = result.error.details[0];
            response.status(422).json({ success: false, error: { field: error.path[0], message: error.message } });
        } else {
            if (result.value.type === "Expense") {
                UserController.addExpense(result.value.creator, result.value.amount);
            } else {
                UserController.addIncome(result.value.creator, result.value.amount);
            }
            try {
                let newTransaction = new Transaction(result.value);
                let saved = await newTransaction.save();
                let transaction = await saved.populate("category").execPopulate();
                response.status(201).json({ success: true, message: `Transaction recorded!`, transaction: transaction });
            } catch (error) {
                response.status(500).json({ success: false, error: error.message });
            }
        }
    }

    // view a transaction
    async getTransaction(request, response) {
        let transaction = await Transaction.findById(request.params.id);
        if (!transaction) {
            response.status(404).json({ success: false, message: "Transaction does not exist!" });
        } else {
            response.status(200).json({ success: true, transaction: transaction });
        }
    }

    // update a transaction
    async updateTransaction(request, response) {
        const result = Validation.NEWTRANSACTION(request.body);

        if (result.error) {
            let error = result.error.details[0];
            response.status(422).json({ success: false, error: { field: error.path[0], message: error.message } });
        } else {
            try {
                let transactionId = request.params.id;
                let { memo, amount, type, date } = result.value;

                let transaction = await Transaction.findOneAndUpdate({ _id: transactionId }, { memo, amount, type, date }, { new: true });
                if (!transaction) {
                    response.status(404).json({ success: false, message: "Transaction does not exist!" });
                } else {
                    response.status(201).json({ success: true, message: "Transaction updated!", transaction: transaction });
                }
            } catch (error) {
                response.status(500).json({ success: false, error: error.message });
            }
        }
    }

    // delete a Transaction
    async deleteTransaction(request, response) {
        try {
            let transaction = await Transaction.findOneAndDelete({ _id: request.params.id });
            if (!transaction) {
                response.status(404).json({ success: false, message: "Transaction does not exist!" });
            } else {
                response.status(200).json({ success: true, message: `${transaction.memo} deleted successfully!`, transaction: transaction });
            }
        } catch (error) {
            response.status(500).json({ success: false, error: error.message });
        }
    }

    // get users transcations
    async getMyTransactions(request, response) {
        let creator = request.params.creator;
        try {
            let myTransactions = await Transaction.find({ creator: creator }).sort({ createdAt: -1 }).populate('category');
            if (myTransactions.length < 1) {
                response.status(204).json({ success: true, message: "You do not have any transaction yet!" });
            } else {
                response.status(200).json({ success: true, myTransactions: myTransactions });
            }
        } catch (error) {
            response.status(500).json({ success: false, error: error.message });
        }
    }
}

export default new TransactionsController();