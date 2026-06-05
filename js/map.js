// 中国地图绘制类
class ChinaMapDrawer {
    constructor(svgElement) {
        this.svg = svgElement;
        this.width = 1000;
        this.height = 800;
    }

    // 绘制地图背景
    drawMapBackground() {
        // 创建一个简单的中国地图轮廓（使用简化版本）
        const provinceData = this.getProvinceData();
        
        // 绘制各省份
        provinceData.forEach(province => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('class', 'province');
            path.setAttribute('d', province.path);
            path.setAttribute('title', province.name);
            this.svg.appendChild(path);
        });

        // 添加背景色
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');
        rect.setAttribute('fill', '#e3f2fd');
        this.svg.insertBefore(rect, this.svg.firstChild);
    }

    // 绘制地点标记
    drawLocationMarkers(poems, onClickCallback, onHoverCallback) {
        poems.forEach(poem => {
            if (!poem.coordinates) return;

            const [x, y] = poem.coordinates;
            
            // 创建标记组
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', 'location-marker');
            
            // 创建圆点
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', '6');
            
            g.appendChild(circle);
            this.svg.appendChild(g);

            // 绑定事件
            g.addEventListener('click', () => onClickCallback(poem));
            g.addEventListener('mouseenter', () => onHoverCallback(poem));
            g.addEventListener('mouseleave', () => {
                document.getElementById('tooltip').classList.remove('visible');
            });
        });
    }

    // 获取省份数据（简化的中国地图）
    getProvinceData() {
        // 这是一个简化版的省份轮廓数据
        // 实际使用中可以使用更详细的 GeoJSON 数据
        return [
            {
                name: '北京',
                path: 'M 600 200 L 620 200 L 620 220 L 600 220 Z'
            },
            {
                name: '上海',
                path: 'M 700 350 L 720 350 L 720 370 L 700 370 Z'
            },
            {
                name: '陕西',
                path: 'M 450 250 L 500 250 L 500 350 L 450 350 Z'
            },
            {
                name: '四川',
                path: 'M 380 350 L 450 350 L 450 450 L 380 450 Z'
            },
            {
                name: '广东',
                path: 'M 550 500 L 650 500 L 650 600 L 550 600 Z'
            },
            {
                name: '江苏',
                path: 'M 650 300 L 700 300 L 700 380 L 650 380 Z'
            },
            {
                name: '浙江',
                path: 'M 700 320 L 750 320 L 750 400 L 700 400 Z'
            },
            {
                name: '山东',
                path: 'M 600 220 L 680 220 L 680 300 L 600 300 Z'
            },
            {
                name: '湖北',
                path: 'M 500 350 L 600 350 L 600 420 L 500 420 Z'
            },
            {
                name: '湖南',
                path: 'M 500 420 L 600 420 L 600 500 L 500 500 Z'
            },
            {
                name: '江西',
                path: 'M 600 380 L 650 380 L 650 470 L 600 470 Z'
            },
            {
                name: '安徽',
                path: 'M 600 300 L 680 300 L 680 380 L 600 380 Z'
            },
            {
                name: '河南',
                path: 'M 500 250 L 600 250 L 600 350 L 500 350 Z'
            },
            {
                name: '山西',
                path: 'M 500 200 L 600 200 L 600 250 L 500 250 Z'
            },
            {
                name: '河北',
                path: 'M 550 150 L 650 150 L 650 220 L 550 220 Z'
            },
            {
                name: '甘肃',
                path: 'M 300 200 L 400 200 L 400 350 L 300 350 Z'
            },
            {
                name: '青海',
                path: 'M 300 150 L 380 150 L 380 220 L 300 220 Z'
            },
            {
                name: '新疆',
                path: 'M 150 100 L 300 100 L 300 350 L 150 350 Z'
            },
            {
                name: '西藏',
                path: 'M 200 350 L 350 350 L 350 500 L 200 500 Z'
            },
            {
                name: '云南',
                path: 'M 350 450 L 450 450 L 450 600 L 350 600 Z'
            },
            {
                name: '贵州',
                path: 'M 400 420 L 500 420 L 500 500 L 400 500 Z'
            },
            {
                name: '福建',
                path: 'M 700 400 L 750 400 L 750 500 L 700 500 Z'
            },
            {
                name: '海南',
                path: 'M 600 600 L 650 600 L 650 680 L 600 680 Z'
            }
        ];
    }
}
