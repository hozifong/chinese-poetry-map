// 中国地图绘制类
class ChinaMapDrawer {
    constructor(svgElement) {
        this.svg = svgElement;
        this.width = 1200;
        this.height = 900;
        this.minLon = 73.5;
        this.maxLon = 135.5;
        this.minLat = 18.0;
        this.maxLat = 53.5;
    }

    // 将地理坐标转换为SVG坐标
    lonLatToSvg(lon, lat) {
        const x = ((lon - this.minLon) / (this.maxLon - this.minLon)) * this.width;
        const y = ((this.maxLat - lat) / (this.maxLat - this.minLat)) * this.height;
        return [x, y];
    }

    // 绘制地图背景
    drawMapBackground(geoJsonData) {
        // 绘制各省份
        geoJsonData.features.forEach(feature => {
            const geometry = feature.geometry;
            const name = feature.properties.name;
            
            if (geometry.type === 'Polygon') {
                const coords = geometry.coordinates[0];
                let pathData = this.coordsToPath(coords);
                
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('class', 'province');
                path.setAttribute('d', pathData);
                path.setAttribute('title', name);
                this.svg.appendChild(path);
            }
        });

        // 添加背景色
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');
        rect.setAttribute('fill', '#e3f2fd');
        this.svg.insertBefore(rect, this.svg.firstChild);
    }

    // 将坐标数组转换为SVG路径
    coordsToPath(coords) {
        if (!coords || coords.length === 0) return '';
        
        const svgCoords = coords.map(coord => {
            const [x, y] = this.lonLatToSvg(coord[0], coord[1]);
            return `${x},${y}`;
        });
        
        return `M ${svgCoords.join(' L ')} Z`;
    }

    // 绘制地点标记
    drawLocationMarkers(poems, onClickCallback, onHoverCallback) {
        poems.forEach(poem => {
            if (!poem.coordinates) return;

            const [lon, lat] = poem.coordinates;
            const [x, y] = this.lonLatToSvg(lon, lat);
            
            // 创建标记组
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', 'location-marker');
            
            // 创建圆点
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', '6');
            circle.setAttribute('data-poem-id', poem.id);
            
            g.appendChild(circle);
            this.svg.appendChild(g);

            // 绑定事件
            g.addEventListener('click', () => onClickCallback(poem));
            g.addEventListener('mouseenter', () => onHoverCallback(poem));
            g.addEventListener('mouseleave', () => {
                const tooltip = document.getElementById('tooltip');
                if (tooltip) {
                    tooltip.classList.remove('visible');
                }
            });
        });
    }
}

// 应用初始化
document.addEventListener('DOMContentLoaded', async () => {
    const svgElement = document.getElementById('map-svg');
    const drawer = new ChinaMapDrawer(svgElement);
    
    try {
        // 加载地图数据
        const mapResponse = await fetch('data/china-map.json');
        const mapData = await mapResponse.json();
        drawer.drawMapBackground(mapData);
        
        // 加载古诗数据
        const poemsResponse = await fetch('data/poems.json');
        const poems = await poemsResponse.json();
        
        // 绘制标记
        drawer.drawLocationMarkers(
            poems,
            (poem) => showPoemCard(poem),
            (poem) => showTooltip(poem)
        );
    } catch (error) {
        console.error('加载数据失败:', error);
    }
});

// 显示古诗卡片
function showPoemCard(poem) {
    const modal = document.getElementById('poem-modal');
    document.getElementById('poem-title').textContent = poem.title;
    document.getElementById('poem-author').textContent = `${poem.author} - ${poem.dynasty}`;
    document.getElementById('poem-location').textContent = `地点：${poem.location}（${poem.province}）`;
    document.getElementById('poem-content').textContent = poem.content;
    modal.style.display = 'block';
}

// 显示悬停提示
function showTooltip(poem) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = `${poem.title} - ${poem.author}`;
    tooltip.classList.add('visible');
}

// 关闭模态窗口
function closeModal() {
    const modal = document.getElementById('poem-modal');
    modal.style.display = 'none';
}

// 点击模态外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('poem-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
