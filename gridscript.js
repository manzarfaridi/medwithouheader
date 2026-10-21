document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements Mapping
    const viewToggleBtn = document.getElementById('view-toggle-btn');
    const productsWrapper = document.getElementById('products-wrapper');
    const productCards = document.querySelectorAll('.product-card');
    const searchBox = document.getElementById('search-box');
    const companyCheckboxes = document.querySelectorAll('.company-select');
    const productCheckboxes = document.querySelectorAll('.product-select-checkbox');
    const selectedCountSpan = document.getElementById('selected-count');
    const categoryLinks = document.querySelectorAll('.category-link');
    
    const btnXlsx = document.querySelector('.btn-xlsx');
    const btnWhatsapp = document.querySelector('.btn-whatsapp');

    const modalOverlay = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-product-title');
    const modalDetails = document.getElementById('modal-product-details');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    let activeCategory = 'show all';

    // 1. DYNAMIC GRID/LIST SYSTEM TOGGLE
    if (viewToggleBtn && productsWrapper) {
        viewToggleBtn.addEventListener('click', () => {
            const isList = productsWrapper.classList.toggle('list-mode');
            viewToggleBtn.querySelector('.text').textContent = isList ? 'Switch to Grid View' : 'Switch to List View';
        });
    }

    // 2. RUNTIME METRIC SELECTION COUNTER
       // ==========================================================================
    // 🌟 UPDATED: COUNTER & RESET SELECTION LOGIC
    // ==========================================================================
    const resetSelectionBtn = document.getElementById('reset-selection-btn');

    function updateCounter() {
    const checkedCount = document.querySelectorAll('.product-select-checkbox:checked').length;
    if (selectedCountSpan) selectedCountSpan.textContent = checkedCount;

    // अगर कोई चेकबॉक्स टिक है तो बटन दिखेगा, नहीं तो छिप जाएगा
    if (resetSelectionBtn) {
        if (checkedCount > 0) {
            resetSelectionBtn.style.setProperty('display', 'inline-block', 'important');
        } else {
            resetSelectionBtn.style.setProperty('display', 'none', 'important');
        }
    }
}

    
    productCheckboxes.forEach(cb => cb.addEventListener('change', updateCounter));

    // 💡 रिसेट बटन पर क्लिक करते ही सारे चेकबॉक्स खाली करने का लॉजिक
    if (resetSelectionBtn) {
        resetSelectionBtn.addEventListener('click', () => {
            productCheckboxes.forEach(cb => {
                cb.checked = false;
            });
            // काउंटर को वापस 0 करें और बटन को छिपाएं
            updateCounter();
        });
    }

    // 3. CROSS-FUNCTIONAL TRI-FILTER PIPELINE
    function executeMasterFilter() {
        const query = searchBox.value.toLowerCase().trim();
        const checkedCompanies = Array.from(companyCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.closest('.filter-checkbox').querySelector('.label-text').textContent.toLowerCase().trim());

        productCards.forEach(card => {
            const brand = card.querySelector('.brand-name').textContent.toLowerCase();
            const content = card.querySelector('.card-body').textContent.toLowerCase();

            // Verification Module: Company Matcher
            let matchCompany = false;
            checkedCompanies.forEach(comp => {
                if (brand.includes(comp) || comp.includes(brand) ||
                    (comp === "johnson & johnson" && brand.includes("monocryl")) ||
                    (comp === "healthium" && brand.includes("truglyde")) ||
                    (comp === "meril life" && brand.includes("meril")) ||
                    (comp === "lotus surgical" && brand.includes("mendil"))) {
                    matchCompany = true;
                }
            });

            // Verification Module: Search Stream Matcher
            const matchSearch = brand.includes(query) || content.includes(query);

            // Verification Module: Categorization Node Matcher
            let matchCategory = false;
            if (activeCategory === 'show all') matchCategory = true;
            else if (activeCategory === 'surgical sutures' && (brand.includes('monocryl') || brand.includes('truglyde') || brand.includes('mitsu'))) matchCategory = true;
            else if (activeCategory === 'analgesics' && brand.includes('meril')) matchCategory = true;
            else if (activeCategory === 'gastro' && brand.includes('mendil')) matchCategory = true;

            // Visibility Render Decision
            if (matchCompany && matchSearch && matchCategory) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Connect Pipeline Listeners
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            activeCategory = link.textContent.toLowerCase().trim();
            executeMasterFilter();
        });
    });

    if (searchBox) searchBox.addEventListener('input', executeMasterFilter);
    companyCheckboxes.forEach(cb => cb.addEventListener('change', executeMasterFilter));

        // 4. 🔬 POPUP OPEN & DYNAMIC DETAILED REDIRECT LINKING
    const modalXCloseBtn = document.getElementById('modal-close-x-btn');
    const modalExploreDepthBtn = document.getElementById('modal-explore-depth-btn');

    productCards.forEach(card => {
        const viewBtn = card.querySelector('.btn-view-more');
        if (viewBtn) {
            viewBtn.addEventListener('click', () => {
                const title = card.querySelector('.brand-name').textContent;
                const rows = card.querySelectorAll('.info-row');
                const cost = card.querySelector('.product-price').textContent;

                modalTitle.innerHTML = `🔬 Spec Analysis: ${title}`;
                
                let modalHTML = '';
                rows.forEach(r => { modalHTML += `<div class="modal-body-row">${r.innerHTML}</div>`; });
                modalHTML += `<div class="modal-body-row"><strong>Global Logistics Valuation:</strong> ${cost}</div>`;

                modalDetails.innerHTML = modalHTML;

                // 🌟 डायनामिक लिंक जनरेशन: हर प्रोडक्ट का अलग पेज लिंक करने के लिए
                // आप यहाँ अपने असली पेज का पाथ दे सकते हैं, जैसे `details.html?product=monocryl`
                const formattedProductParam = encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
                modalExploreDepthBtn.setAttribute('href', `details.html?product=${formattedProductParam}`);

                modalOverlay.classList.add('active');
            });
        }
    });

    // ऊपर लगे (X) बटन से पॉपअप बंद करने का लॉजिक
    if (modalXCloseBtn) {
        modalXCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }

    // बाहर की स्क्रीन पर क्लिक करने पर भी पॉपअप बंद हो जाए
    modalOverlay.addEventListener('click', (e) => { 
        if (e.target === modalOverlay) modalOverlay.classList.remove('active'); 
    });

    // 5. EXCEL EXPORT CONTROLLER (.CSV FORMAT)
    if (btnXlsx) {
        btnXlsx.addEventListener('click', () => {
            const selected = document.querySelectorAll('.product-select-checkbox:checked');
            if (selected.length === 0) { alert('Please select at least one asset to compile.'); return; }

            let csv = "data:text/csv;charset=utf-8,Asset Profile,Rate Bracket\n";
            selected.forEach(cb => {
                const c = cb.closest('.product-card');
                csv += `"${c.querySelector('.brand-name').textContent}","${c.querySelector('.product-price').textContent}"\n`;
            });
            
            const dl = document.createElement("a");
            dl.setAttribute("href", encodeURI(csv));
            dl.setAttribute("download", "surgical_asset_matrix.csv");
            document.body.appendChild(dl);
            dl.click();
            document.body.removeChild(dl);
        });
    }

    // 6. WHATSAPP DATA BRIDGE DISPATCHER
    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', () => {
            const selected = document.querySelectorAll('.product-select-checkbox:checked');
            if (selected.length === 0) { alert('Select clinical profiles before dispatching.'); return; }

            let text = "✨ *Surgical Asset Optimization Manifest* ✨\n\n";
            selected.forEach((cb, idx) => {
                const c = cb.closest('.product-card');
                text += `${idx + 1}. *${c.querySelector('.brand-name').textContent}* | ${c.querySelector('.product-price').textContent}\n`;
            });

            window.open(`https://whatsapp.com{encodeURIComponent(text)}`, '_blank');
        });
    }
});
