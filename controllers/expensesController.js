import Expense from "../models/Expense.js";

// Create Expense
export const createExpense = async (req, res) => {
  const { expense, description, category } = req.body;
  if (!expense || !description || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newExpense = await Expense.create({
      expense,
      description,
      category,
      user: req.user._id,
    });
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Expense
export const updateExpense = async (req, res) => {
  const { expense, description, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid expense ID" });
  }

  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { expense, description, category },
      { new: true }
    );
    if (!updatedExpense)
      return res.status(404).json({ message: "Expense not found" });
    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid expense ID" });
  }

  try {
    const deletedExpense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deletedExpense)
      return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
