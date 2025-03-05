// 模拟交易数据
const transactions = [
    {
        id: 1,
        type: 'expense',
        category: '购物',
        amount: -156.80,
        date: '2024-01-20 14:30',
        icon: 'cart'
    },
    {
        id: 2,
        type: 'expense',
        category: '餐饮',
        amount: -28.00,
        date: '2024-01-20 12:15',
        icon: 'cup-hot'
    },
    {
        id: 3,
        type: 'income',
        category: '工资',
        amount: 5000.00,
        date: '2024-01-19 10:00',
        icon: 'wallet2'
    }
];

// 渲染交易列表
function renderTransactions() {
    const transactionList = document.querySelector('.transaction-list');
    transactionList.innerHTML = transactions.map(transaction => `
        <div class="transaction-item" data-id="${transaction.id}">
            <div class="transaction-icon">
                <i class="bi bi-${transaction.icon}"></i>
            </div>
            <div class="transaction-info">
                <div class="d-flex justify-content-between">
                    <h6 class="mb-0">${transaction.category}</h6>
                    <span class="transaction-amount ${transaction.type}">
                        ${transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                    </span>
                </div>
                <small class="text-secondary">${formatDate(transaction.date)}</small>
            </div>
        </div>
    `).join('');
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderTransactions();
}); 