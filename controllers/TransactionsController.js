import Transaction from '../models/Transaction';
import Validation from '../requests/Validation';

class TransactionsController {

    // add a new Transasction [Expense/Income]
    async newTransaction(request, response) {
        const result = Validation.NEWTRANSACTION(request.body);

        if (result.error) {
            let error = result.error.details[0];
            response.status(422).json({ success: false, error: { field: error.path[0], message: error.message } });
        } else {
            try {
                let newTransaction = new Transaction(result.value);
                let transaction = await newTransaction.save();
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
            response.status(201).json({ success: true, transaction: transaction });
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
                    response.status(201).json({ success: true, message: "Transaction updated!", updatedTransaction: transaction });
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
                response.status(201).json({ success: true, message: `${transaction.memo} deleted successfully!`, deletedTransaction: transaction });
            }
        } catch (error) {
            response.status(500).json({ success: false, error: error.message });
        }
    }
}

export default new TransactionsController();