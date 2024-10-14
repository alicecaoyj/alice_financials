{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww30040\viewh18340\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Store categories, budgets, and spending\
let categories = JSON.parse(localStorage.getItem('categories')) || \{\};\
\
// Check if the month has changed\
const currentMonth = new Date().getMonth();\
const storedMonth = localStorage.getItem('month');\
if (storedMonth == null || parseInt(storedMonth) !== currentMonth) \{\
  localStorage.setItem('month', currentMonth);\
  localStorage.removeItem('categories'); // Reset data for a new month\
  categories = \{\}; // Reset categories for a new month\
\}\
\
// Function to set the budget for a category\
function setBudget() \{\
  const category = document.getElementById('category').value;\
  const budget = parseFloat(document.getElementById('budget').value);\
\
  if (category && !isNaN(budget)) \{\
    if (!categories[category]) \{\
      categories[category] = \{ budget: 0, spent: 0 \};\
      addCategoryToDropdown(category);  // Add new category to dropdown\
    \}\
    categories[category].budget = budget;\
\
    localStorage.setItem('categories', JSON.stringify(categories)); // Save to localStorage\
    document.getElementById('category').value = ''; // Clear input field\
    document.getElementById('budget').value = ''; // Clear input field\
\
    updateSummary(); // Update the summary display\
  \} else \{\
    alert('Please enter a valid category and budget.');\
  \}\
\}\
\
// Function to add a new category to the dropdown menu\
function addCategoryToDropdown(category) \{\
  const dropdown = document.getElementById('spending-category');\
  const option = document.createElement('option');\
  option.value = category;\
  option.text = category;\
  dropdown.appendChild(option);\
\}\
\
// Populate the dropdown with existing categories when page loads\
function populateDropdown() \{\
  const dropdown = document.getElementById('spending-category');\
  dropdown.innerHTML = '<option value="" disabled selected>Select a category</option>';  // Reset dropdown\
  for (let category in categories) \{\
    addCategoryToDropdown(category);\
  \}\
\}\
\
// Function to log spending for a category\
function logSpending() \{\
  const category = document.getElementById('spending-category').value;\
  const spending = parseFloat(document.getElementById('spending-amount').value);\
\
  if (category && !isNaN(spending)) \{\
    if (!categories[category]) \{\
      alert('Please set a budget for this category first.');\
      return;\
    \}\
    categories[category].spent += spending;\
\
    localStorage.setItem('categories', JSON.stringify(categories)); // Save to localStorage\
    document.getElementById('spending-amount').value = ''; // Clear input field\
\
    updateSummary(); // Update the summary display\
  \} else \{\
    alert('Please enter a valid category and amount spent.');\
  \}\
\}\
\
// Function to update the budget summary display\
function updateSummary() \{\
  const summaryDiv = document.getElementById('budget-summary');\
  summaryDiv.innerHTML = ''; // Clear previous summary\
\
  for (let category in categories) \{\
    const \{ budget, spent \} = categories[category];\
    const remaining = budget - spent;\
    const summaryItem = document.createElement('div');\
    summaryItem.innerHTML = `<strong>$\{category\}:</strong> Spent $$\{spent.toFixed(2)\}, Remaining $$\{remaining.toFixed(2)\} of $$\{budget.toFixed(2)\}`;\
    summaryDiv.appendChild(summaryItem);\
  \}\
\}\
\
// Function to reset the budget\
function resetBudget() \{\
  if (confirm("Are you sure you want to reset your budget and spending data?")) \{\
    localStorage.removeItem('categories'); // Clear the saved data\
    categories = \{\}; // Reset the categories object\
    localStorage.setItem('month', currentMonth); // Set the current month again\
\
    // Clear the dropdown and summary\
    populateDropdown();\
    updateSummary();\
    \
    alert("Your budget has been reset!");\
  \}\
\}\
\
// Initialize dropdown and summary display when the page loads\
populateDropdown();\
updateSummary();\
}