// 主要应用逻辑
class ChinesePoetryMap {
    constructor() {
        this.mapSvg = document.getElementById('mapSvg');
        this.tooltip = document.getElementById('tooltip');
        this.modal = document.getElementById('poemModal');
        this.closeBtn = document.querySelector('.close');
        
        this.mapDrawer = new ChinaMapDrawer(this.mapSvg);
        this.poems = poemsData;
        
        this.init();
    }

    init() {
        // 绘制地图背景
        this.mapDrawer.drawMapBackground();
        
        // 绘制地点标记
        this.mapDrawer.drawLocationMarkers(
            this.poems,
            (poem) => this.showPoemCard(poem),
            (poem) => this.showTooltip(poem)
        );

        // 绑定关闭按钮事件
        this.closeBtn.addEventListener('click', () => this.closeModal());
        
        // 点击模态框背景关闭
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    // 显示提示框
    showTooltip(poem) {
        this.tooltip.textContent = `${poem.location} - ${poem.title}`;
        this.tooltip.classList.add('visible');
        
        // 跟随鼠标显示提示框
        const moveHandler = (e) => {
            if (this.tooltip.classList.contains('visible')) {
                this.tooltip.style.left = (e.clientX + 10) + 'px';
                this.tooltip.style.top = (e.clientY + 10) + 'px';
            }
        };
        document.addEventListener('mousemove', moveHandler);
    }

    // 隐藏提示框
    hideTooltip() {
        this.tooltip.classList.remove('visible');
    }

    // 显示古诗卡片
    showPoemCard(poem) {
        document.getElementById('poemTitle').textContent = poem.title;
        document.getElementById('poemAuthor').textContent = `— ${poem.author}（${poem.dynasty}）`;
        document.getElementById('poemLocation').textContent = `📍 地点：${poem.location}`;
        document.getElementById('poemText').textContent = poem.text;
        document.getElementById('poemTranslation').textContent = `译文：${poem.translation}`;
        
        this.modal.classList.add('show');
        this.hideTooltip();
    }

    // 关闭模态框
    closeModal() {
        this.modal.classList.remove('show');
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ChinesePoetryMap();
});
