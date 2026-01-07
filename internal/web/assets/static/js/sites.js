import { fetchWebsites } from './api.js';
import { saveUserPreference, getUserPreference } from './utils.js';
import { displayErrorMessage } from './charts.js';


export async function initWebsiteSelector(selector, onWebsiteSelected) {
    try {
        // 获取网站列表
        const websites = await fetchWebsites();

        // 清空网站选择器
        selector.innerHTML = '';

        if (websites.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = '没有可用的网站';
            selector.appendChild(option);
            return '';
        }

        // 填充网站选项
        websites.forEach(website => {
            const option = document.createElement('option');
            option.value = website.id;
            option.textContent = website.name;
            selector.appendChild(option);
        });

        // 尝试从localStorage获取上次选择的网站
        const lastSelected = getUserPreference('selectedWebsite', '');
        let currentWebsiteId = '';

        if (lastSelected && selector.querySelector(`option[value="${lastSelected}"]`)) {
            selector.value = lastSelected;
            currentWebsiteId = lastSelected;
        } else {
            // 如果没有保存的选择或者保存的选择不在列表中，选择第一个网站
            currentWebsiteId = websites[0].id;
            selector.value = currentWebsiteId;
        }

        // 设置变更事件监听器
        selector.addEventListener('change', function () {
            const websiteId = this.value;
            saveUserPreference('selectedWebsite', websiteId);

            if (typeof onWebsiteSelected === 'function') {
                onWebsiteSelected(websiteId);
            }
        });

        return currentWebsiteId;
    } catch (error) {
        console.error('初始化网站选择器失败:', error);
        return '';
    }
}

// 初始化网站标签页
export async function initWebsiteTabs(tabsContainer, onWebsiteSelected) {
    try {
        // 获取网站列表
        const websites = await fetchWebsites();

        // 清空标签容器
        tabsContainer.innerHTML = '';

        if (websites.length === 0) {
            const button = document.createElement('button');
            button.className = 'tab-button';
            button.textContent = '没有可用的网站';
            button.disabled = true;
            tabsContainer.appendChild(button);
            return '';
        }

        // 尝试从localStorage获取上次选择的网站
        const lastSelected = getUserPreference('selectedWebsite', '');
        let currentWebsiteId = lastSelected || '';

        // 创建网站标签
        websites.forEach(website => {
            const button = document.createElement('button');
            button.className = 'tab-button';
            button.textContent = website.name;
            button.dataset.websiteId = website.id;
            button.addEventListener('click', function() {
                handleTabClick(this, onWebsiteSelected);
            });
            tabsContainer.appendChild(button);
        });

        // 设置当前激活的标签
        let activeButton = null;

        if (currentWebsiteId) {
            activeButton = tabsContainer.querySelector(`[data-website-id="${currentWebsiteId}"]`);
        }

        if (!activeButton) {
            // 如果没有找到匹配的，默认激活第一个网站
            activeButton = tabsContainer.querySelector('.tab-button');
            currentWebsiteId = activeButton.dataset.websiteId;
        }

        activeButton.classList.add('active');

        return currentWebsiteId;
    } catch (error) {
        console.error('初始化网站标签失败:', error);
        displayErrorMessage('无法初始化网站标签');
        return '';
    }
}

// 处理标签点击事件
function handleTabClick(clickedButton, onWebsiteSelected) {
    const tabsContainer = clickedButton.parentElement;

    // 移除所有标签的active类
    const allButtons = tabsContainer.querySelectorAll('.tab-button');
    allButtons.forEach(btn => btn.classList.remove('active'));

    // 添加active类到点击的标签
    clickedButton.classList.add('active');

    // 获取网站ID
    const websiteId = clickedButton.dataset.websiteId;

    // 保存用户选择
    saveUserPreference('selectedWebsite', websiteId);

    // 调用回调函数
    if (typeof onWebsiteSelected === 'function') {
        onWebsiteSelected(websiteId);
    }
}