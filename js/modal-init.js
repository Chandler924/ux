// 记账弹窗模板
const modalTemplate = `
<div class="modal fade" id="addTransactionModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0 pb-0">
                <h5 class="modal-title">添加记账</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="transaction-type-tabs">
                    <button class="tab-btn active" data-type="expense">支出</button>
                    <button class="tab-btn" data-type="income">收入</button>
                </div>

                <div class="amount-section">
                    <label class="form-label">金额</label>
                    <div class="amount-field">
                        <span class="currency-symbol">¥</span>
                        <input type="number" placeholder="0.00" step="0.01">
                    </div>
                </div>

                <div class="category-section">
                    <!-- 支出分类 -->
                    <div class="expense-categories">
                        <div class="category-item active">
                            <i class="bi bi-cart"></i>
                            <span>购物</span>
                        </div>
                        <div class="category-item">
                            <i class="bi bi-cup-hot"></i>
                            <span>餐饮</span>
                        </div>
                        <div class="category-item">
                            <i class="bi bi-bus-front"></i>
                            <span>交通</span>
                        </div>
                        <div class="category-item">
                            <i class="bi bi-house"></i>
                            <span>住房</span>
                        </div>
                        <div class="category-item">
                            <i class="bi bi-phone"></i>
                            <span>通讯</span>
                        </div>
                        <div class="category-item">
                            <i class="bi bi-heart-pulse"></i>
                            <span>医疗</span>
                        </div>
                        <div class="category-item">
                            <i class="bi bi-book"></i>
                            <span>教育</span>
                        </div>
                        <div class="category-item">
                            <i class="bi bi-gift"></i>
                            <span>娱乐</span>
                        </div>
                    </div>
                    <!-- 收入分类 -->
                    <div class="income-categories" style="display: none;">
                        <div class="category-item">
                            <i class="bi bi-wallet2"></i>
                            <span>工资</span>
                        </div>
                        <div class="category-item">
                            <i class="bi bi-piggy-bank"></i>
                            <span>奖金</span>
                        </div>
                        <div class="category-item">
                            <i class="bi bi-graph-up-arrow"></i>
                            <span>投资</span>
                        </div>
                        <div class="category-item">
                            <i class="bi bi-cash-coin"></i>
                            <span>其他</span>
                        </div>
                    </div>
                </div>

                <div class="note-section">
                    <label class="form-label">备注</label>
                    <input type="text" class="form-control" placeholder="添加备注信息">
                </div>

                <div class="datetime-section">
                    <label class="form-label">日期时间</label>
                    <input type="datetime-local" class="form-control" value="">
                </div>
            </div>
            <div class="modal-footer border-0 pt-0">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" id="saveTransaction">保存</button>
            </div>
        </div>
    </div>
</div>`;

// 初始化记账弹窗
function initTransactionModal() {
    // 添加弹窗到页面
    document.body.insertAdjacentHTML('beforeend', modalTemplate);
    
    const modal = new bootstrap.Modal(document.getElementById('addTransactionModal'));
    
    // 设置默认日期时间
    document.querySelector('input[type="datetime-local"]').value = 
        new Date().toISOString().slice(0, 16);
    
    // 添加按钮点击事件
    document.querySelectorAll('.add-button, .action-button').forEach(button => {
        button.addEventListener('click', (e) => {
            modal.show();
            
            // 如果是快捷操作按钮，自动选择对应类型
            const actionType = e.currentTarget.closest('.action-item')?.querySelector('span')?.textContent;
            if (actionType) {
                const typeButtons = document.querySelectorAll('.transaction-type-tabs .btn');
                typeButtons.forEach(btn => {
                    if (btn.textContent === actionType) {
                        btn.click();
                    }
                });
            }
        });
    });

    // 分类选择
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.closest('.expense-categories, .income-categories');
            parent.querySelectorAll('.category-item').forEach(el => {
                el.classList.remove('active');
            });
            item.classList.add('active');
        });
    });

    // 切换收支类型
    document.querySelectorAll('.transaction-type-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            document.querySelectorAll('.transaction-type-tabs .tab-btn').forEach(el => {
                el.classList.remove('active');
            });
            btn.classList.add('active');

            // 切换分类列表
            const type = btn.dataset.type;
            document.querySelector('.expense-categories').style.display = 
                type === 'expense' ? 'grid' : 'none';
            document.querySelector('.income-categories').style.display = 
                type === 'income' ? 'grid' : 'none';
        });
    });

    // 保存记录
    document.getElementById('saveTransaction').addEventListener('click', () => {
        // TODO: 实现保存逻辑
        modal.hide();
    });
}

// 确保在 DOM 加载完成后再初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTransactionModal);
} else {
    initTransactionModal();
} 