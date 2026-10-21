/**
 * =================================================================================
 * 📊 BIHAR DRUGS AGENCY (BDA) - ECOSYSTEM ARCHITECTURE CONTROLLER
 * =================================================================================
 */

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================================================
    // 🍔 MODULE 1: GLOBAL NAVIGATION & MOBILE MENU SYSTEM
    // ==========================================================================
    const hamburgerBtn = document.getElementById("bdaHamburgerBtn");
    const navMenu = document.getElementById("bdaNavMenu");
    const searchTrigger = document.getElementById("bdaMobileSearchTrigger");
    const searchForm = document.getElementById("bdaSearchForm");

    // 1. हैमबर्गर क्लिक (मोबाइल मेनू खोलना/बंद करना)
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            navMenu.classList.toggle("open");
            navMenu.classList.toggle("bda-menu-open");
            hamburgerBtn.classList.toggle("bda-close-toggle");
            
            if (searchForm) {
                searchForm.classList.remove("bda-search-open");
            }
        });
    }

    // 2. सर्च आइकॉन क्लिक (मोबाइल सर्च बॉक्स ऑन/ऑफ़)
    if (searchTrigger && searchForm) {
        searchTrigger.addEventListener("click", function (event) {
            event.stopPropagation();
            searchForm.classList.toggle("bda-search-open");
            
            if (navMenu && hamburgerBtn) {
                navMenu.classList.remove("open", "bda-menu-open");
                hamburgerBtn.classList.remove("bda-close-toggle");
            }
        });
    }

    // 3. आउटसाइड क्लिक (स्क्रीन पर कहीं भी क्लिक करने पर खुले हुए मेनू या सर्च को बंद करना)
    document.addEventListener("click", function (event) {
        if (navMenu && !navMenu.contains(event.target) && hamburgerBtn && !hamburgerBtn.contains(event.target)) {
            navMenu.classList.remove("open", "bda-menu-open");
            hamburgerBtn.classList.remove("bda-close-toggle");
        }
        if (searchForm && !searchForm.contains(event.target) && searchTrigger && !searchTrigger.contains(event.target)) {
            searchForm.classList.remove("bda-search-open");
        }
    });

    // 4. यूआरएल ट्रैकर (एक्टिव पेज को हाइलाइट करने का लॉजिक)
    const currentPage = window.location.pathname.split("/").pop();
    const menuLinks = document.querySelectorAll('#bdaNavMenu li a');

    menuLinks.forEach(link => {
        link.classList.remove('bda-active');
        const linkPage = link.getAttribute('href');

        if (currentPage === linkPage) {
            link.classList.add('bda-active');
        } else if ((currentPage === "" || currentPage === "index.html") && linkPage === "index.html") {
            link.classList.add('bda-active');
        }
    });


    // ==========================================================================
    // 🔒 MODULE 2: PREMIUM AUTHENTICATION MODAL ENGINE
    // ==========================================================================
    const authOverlay = document.getElementById('authOverlay');
    const authCard = document.getElementById('authCard');
    const closeAuthBtn = document.getElementById('closeAuthBtn');
    const loginTriggers = document.querySelectorAll('.login-trigger');
    const sectionLoginTrigger = document.querySelector('.section-login-trigger');
    const sectionSignupTrigger = document.querySelector('.section-signup-trigger');
    const navSignUpBtn = document.getElementById('navSignUpBtn'); 
    const toSignUp = document.getElementById('toSignUp');
    const toSignIn = document.getElementById('toSignIn');
    const brandTitle = document.getElementById('brandTitle');
    const brandDesc = document.getElementById('brandDesc');

    function updateMobileFormVisibility() {
        if (window.innerWidth <= 850 && authCard) {
            const signInBox = document.querySelector('.auth-overlay .signin-box');
            const signUpBox = document.querySelector('.auth-overlay .sign-up-box');
            
            if (signInBox && signUpBox) {
                if (authCard.classList.contains('show-signup')) {
                    signInBox.style.setProperty('display', 'none', 'important');
                    signUpBox.style.setProperty('display', 'flex', 'important');
                } else {
                    signInBox.style.setProperty('display', 'flex', 'important');
                    signUpBox.style.setProperty('display', 'none', 'important');
                }
            }
        }
    }

    loginTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            if (authOverlay) {
                authOverlay.classList.add('open-modal', 'open-popup');
                if (navMenu) navMenu.classList.remove('open', 'bda-menu-open');
            }
        });
    });

    if (navSignUpBtn) {
        navSignUpBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            if (authOverlay) authOverlay.classList.add('open-popup');
            updateMobileFormVisibility();
        });
    }

    if (sectionLoginTrigger) {
        sectionLoginTrigger.addEventListener('click', () => {
            if (authCard) authCard.classList.remove('show-signup'); 
            if (authOverlay) authOverlay.classList.add('open-popup');
            if (brandTitle) brandTitle.innerText = "Premium Solutions For Global Medical Supply";
            if (brandDesc) brandDesc.innerText = "Access your secure executive dashboard to manage integrations.";
            updateMobileFormVisibility();
        });
    }

    if (sectionSignupTrigger) {
        sectionSignupTrigger.addEventListener('click', () => {
            if (authCard) authCard.classList.add('show-signup'); 
            if (authOverlay) authOverlay.classList.add('open-popup');
            if (brandTitle) brandTitle.innerText = "Join Our Global Medical Supply Network";
            if (brandDesc) brandDesc.innerText = "Create your secure portal identity to unlock instant pricing.";
            updateMobileFormVisibility();
        });
    }

    if (closeAuthBtn) {
        closeAuthBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (authOverlay) authOverlay.classList.remove('open-modal', 'open-popup');
        });
    }

    if (authOverlay) {
        authOverlay.addEventListener('click', (e) => {
            if (e.target === authOverlay) {
                if (authOverlay) authOverlay.classList.remove('open-modal', 'open-popup');
            }
        });
    }

    if (toSignUp) {
        toSignUp.addEventListener('click', () => {
            if (authCard) authCard.classList.add('show-signup');
            if (brandTitle) brandTitle.innerText = "Join Our Global Medical Supply Network";
            if (brandDesc) brandDesc.innerText = "Create your secure portal identity to unlock instant pricing.";
            updateMobileFormVisibility();
        });
    }

    if (toSignIn) {
        toSignIn.addEventListener('click', () => {
            if (authCard) authCard.classList.remove('show-signup');
            if (brandTitle) brandTitle.innerText = "Premium Solutions For Global Medical Supply";
            if (brandDesc) brandDesc.innerText = "Access your secure executive dashboard to manage integrations.";
            updateMobileFormVisibility();
        });
    }

    window.addEventListener('resize', updateMobileFormVisibility);

    const maskIcons = document.querySelectorAll('.toggle-mask');
    maskIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const pwdInput = this.parentElement.querySelector('.pwd-field');
            if (pwdInput) {
                if (pwdInput.type === 'password') {
                    pwdInput.type = 'text';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                } else {
                    pwdInput.type = 'password';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                }
            }
        });
    });


    // ==========================================================================
    // 📁 MODULE 3: SECURE DRAG-AND-DROP FILE UPLOADER
    // ==========================================================================
    const dropZone = document.getElementById('dropZone');
    const docInput = document.getElementById('documentUploadInput');
    const fileListName = document.getElementById('fileListName');

    if (dropZone && docInput) {
        dropZone.addEventListener('click', () => docInput.click());

        docInput.addEventListener('change', () => {
            if (docInput.files.length > 0) {
                let names = Array.from(docInput.files).map(f => f.name).join(', ');
                fileListName.innerText = "Selected: " + names;
                fileListName.style.color = "var(--auth-navy)";
            } else {
                fileListName.innerText = "No file selected";
                fileListName.style.color = "var(--auth-orange)";
            }
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = "var(--auth-navy)";
            dropZone.style.background = "#f0f4f8";
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.style.borderColor = "var(--auth-border)";
            dropZone.style.background = "#f8fafc";
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = "var(--auth-border)";
            dropZone.style.background = "#f8fafc";
            
if (e.dataTransfer.files.length > 0) {
docInput.files = e.dataTransfer.files;
let names = Array.from(docInput.files).map(f => f.name).join(', ');
fileListName.innerText = "Dropped: " + names;
fileListName.style.color = "var(--auth-navy)";
}
});
}
// ==========================================================================
// 📊 MODULE 4: DUAL SCREEN VIEW CONTROLLER (GRID vs LIST MODULES)
// ==========================================================================
const btnList = document.getElementById("btn-list-view");
const btnGrid = document.getElementById("btn-grid-view");
const listSection = document.getElementById("bda-list-view-section");
const gridSection = document.getElementById("bda-grid-view-section");
const alertToast = document.getElementById("orientationAlert");
const closeBtn = document.getElementById("closeToastBtn");
if (btnList && btnGrid) {
btnList.addEventListener("click", function () {
btnList.classList.add("active");
btnGrid.classList.remove("active");
if (listSection && gridSection) {
listSection.classList.replace("display-off", "display-on");
gridSection.classList.replace("display-on", "display-off");
}
});
btnGrid.addEventListener("click", function () {
btnGrid.classList.add("active");
btnList.classList.remove("active");
if (gridSection && listSection) {
gridSection.classList.replace("display-off", "display-on");
listSection.classList.replace("display-on", "display-off");
}
const isMobileScreen = window.innerWidth <= 768;
const isMobileDevice = /Mobi|Android|iPhone/i.test(navigator.userAgent);
if ((isMobileScreen || isMobileDevice) && alertToast) {
alertToast.style.display = "flex";
setTimeout(() => alertToast.classList.add("show"), 50);
const autoCloseTimeout = setTimeout(closeToast, 10500);
if (closeBtn) {
closeBtn.addEventListener("click", () => {
clearTimeout(autoCloseTimeout);
closeToast();
});
}
}
});
}
function closeToast() {
if (alertToast) {
alertToast.classList.remove("show");
setTimeout(() => { alertToast.style.display = "none"; }, 500);
}
}
// ==========================================================================
// 🛍️ MODULE 5: ACTIVE GRID VIEW FILTER INTERFACE & EXPORTS
// ==========================================================================
const gridSearch = document.querySelector(".bda-input-search");
const companyAll = document.getElementById("company-all");
const singleCompanies = document.querySelectorAll(".company-single");
const categoryAll = document.getElementById("category-all");
const singleCategories = document.querySelectorAll(".category-single");
const productCards = document.querySelectorAll(".bda-product-card");
const btnExcelGrid = document.getElementById("btn-download-excel");
const btnWhatsappGrid = document.getElementById("btn-share-whatsapp");
function filterGridProducts() {
const text = gridSearch ? gridSearch.value.toLowerCase().trim() : "";
const isAllComp = companyAll ? companyAll.checked : true;
const activeComps = Array.from(singleCompanies).filter(cb => cb.checked).map(cb => cb.value);
const isAllCat = categoryAll ? categoryAll.checked : true;
const activeCats = Array.from(singleCategories).filter(cb => cb.checked).map(cb => cb.value);
productCards.forEach(card => {
const brand = (card.getAttribute("data-brand") || "").toLowerCase();
const comp = card.getAttribute("data-company") || "";
const cat = card.getAttribute("data-category") || "";
const matchSearch = brand.includes(text);
const matchComp = isAllComp || activeComps.includes(comp);
const matchCat = isAllCat || activeCats.includes(cat);
card.style.display = (matchSearch && matchComp && matchCat) ? "flex" : "none";
});
}
if (companyAll) {
companyAll.addEventListener("change", function() {
if (this.checked) singleCompanies.forEach(cb => cb.checked = false);
filterGridProducts();
});
singleCompanies.forEach(cb => cb.addEventListener("change", function() {
if (this.checked) companyAll.checked = false;
if (!Array.from(singleCompanies).some(c => c.checked)) companyAll.checked = true;
filterGridProducts();
}));
}
if (categoryAll) {
categoryAll.addEventListener("change", function() {
if (this.checked) singleCategories.forEach(cb => cb.checked = false);
filterGridProducts();
});
singleCategories.forEach(cb => cb.addEventListener("change", function() {
if (this.checked) categoryAll.checked = false;
if (!Array.from(singleCategories).some(c => c.checked)) categoryAll.checked = true;
filterGridProducts();
}));
}
if (gridSearch) gridSearch.addEventListener("input", filterGridProducts);
if (btnExcelGrid) {
btnExcelGrid.addEventListener("click", function() {
const data = [];
productCards.forEach(card => {
const check = card.querySelector(".bda-product-select-check");
if (check && check.checked && card.style.display !== "none") {
data.push({
Brand: card.getAttribute("data-brand"),
Company: card.getAttribute("data-company").toUpperCase(),
Category: card.querySelector(".bda-cat-val").innerText,
Needle_Profile: card.querySelector(".bda-needle-val").innerText,
Suture_Profile: card.querySelector(".bda-suture-val").innerText,
MRP: card.querySelector(".bda-mrp-val").innerText
});
}
});
if (data.length === 0) {
alert("कृपया एक्सपोर्ट करने के लिए पहले 'चुनें (Select)' चेकबॉक्स पर टिक करें!");
return;
}
const worksheet = XLSX.utils.json_to_sheet(data);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Products");
XLSX.writeFile(workbook, "Product_Matrix_Report.xlsx");
});
}
if (btnWhatsappGrid) {
btnWhatsappGrid.addEventListener("click", function() {
let msg = "*📦 Selected Products Report *\n\n";
let count = 0;
productCards.forEach((card) => {
const check = card.querySelector(".bda-product-select-check");
if (check && check.checked && card.style.display !== "none") {
count++;
msg += count + ". " + card.getAttribute("data-brand") + " (" + card.getAttribute("data-company").toUpperCase() + ")\n";
msg += "   • Cat: " + card.querySelector(".bda-cat-val").innerText + "\n";
msg += "   • Price: " + card.querySelector(".bda-mrp-val").innerText + "\n\n";
}
});
if (count === 0) {
alert("कृपया व्हाट्सएप पर भेजने के लिए पहले किसी उत्पाद को सेलेक्ट करें!");
return;
}
window.open("whatsapp.com" + encodeURIComponent(msg), "_blank");
});
}
// ==========================================================================
// 📋 MODULE 6: HIGH-PRECISION LIST TABLE INVENTORY ENGINE (🔴 FIXED CODE)
// ==========================================================================
const listSearch = document.getElementById("pharmaLiveSearchInput");
const tableBody = document.getElementById("pharmaTableBodyRows");
const noResultsMsg = document.getElementById("noPharmaResultsMessage");
const selectAllCheckbox = document.getElementById("selectAllPharmaRows");
const exportExcelBtn = document.getElementById("exportExcelBtn");
const shareWhatsappBtn = document.getElementById("shareWhatsappBtn");
const checkedRowsCount = document.getElementById("checkedRowsCount");
const categoryItems = document.querySelectorAll(".category-item");
const companyCheckboxes = document.querySelectorAll(".company-filter-checkbox");
function getTableRowData(row) {
if (!row || !row.cells || row.cells.length < 6) {
return { brand: "", needle: "", suture: "", comp: "", mrp: "" };
}
return {
brand: row.cells[1] ? row.cells[1].innerText.trim() : "",
needle: row.cells[2] ? row.cells[2].innerText.trim() : "",
suture: row.cells[3] ? row.cells[3].innerText.trim() : "",
comp: row.cells[4] ? row.cells[4].innerText.trim() : "",
mrp: row.cells[5] ? row.cells[5].innerText.trim() : ""
};
}
function filterListInventory() {
if (!tableBody) return;
const rows = tableBody.getElementsByTagName("tr");
const text = listSearch ? listSearch.value.toLowerCase().trim() : "";
const activeCatItem = document.querySelector(".category-item.active-cat");
const activeCat = activeCatItem ? activeCatItem.getAttribute("data-category") : "all";
const selectedComps = Array.from(companyCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
let matchCount = 0;
Array.from(rows).forEach(row => {
const rowCat = row.getAttribute("data-prod-cat") || "";
const rowComp = row.getAttribute("data-company") || "";
const data = getTableRowData(row);
const matchCat = (activeCat === "all" || rowCat === activeCat);
const matchComp = selectedComps.length === 0 || selectedComps.includes(rowComp);
// 🚀 स्वच्छ सुपीरियर स्ट्रिंग कॉन्सटेनेशन इंजन (कोई एरर नहीं)
const rowFullText = (data.brand + " " + data.needle + " " + data.suture + " " + data.comp).toLowerCase();
const matchSearch = rowFullText.includes(text);
if (matchCat && matchComp && matchSearch) {
row.style.display = "";
matchCount++;
} else {
row.style.display = "none";
const cb = row.querySelector(".row-select-input");
if (cb) { cb.checked = false; row.classList.remove("row-is-selected"); }
}
});
if (noResultsMsg) noResultsMsg.style.display = (matchCount === 0) ? "block" : "none";
syncActionControls();
}
function syncActionControls() {
if (!tableBody) return;
const checkedInputs = tableBody.querySelectorAll(".row-select-input:checked");
const visibleInputs = tableBody.querySelectorAll("tr:not([style*='display: none']) .row-select-input");
const visibleChecked = tableBody.querySelectorAll("tr:not([style*='display: none']) .row-select-input:checked");
if (checkedRowsCount) checkedRowsCount.innerText = checkedInputs.length;
const isDisabled = checkedInputs.length === 0;
if (exportExcelBtn) exportExcelBtn.disabled = isDisabled;
if (shareWhatsappBtn) shareWhatsappBtn.disabled = isDisabled;
if (selectAllCheckbox) selectAllCheckbox.checked = (visibleInputs.length === visibleChecked.length && visibleInputs.length > 0);
}
if (tableBody) {
tableBody.addEventListener("change", function (e) {
if (e.target && e.target.classList.contains("row-select-input")) {
const tr = e.target.closest("tr");
if (tr) {
if (e.target.checked) tr.classList.add("row-is-selected");
else tr.classList.remove("row-is-selected");
}
syncActionControls();
}
});
if (selectAllCheckbox) {
selectAllCheckbox.addEventListener("change", function() {
const isChecked = this.checked;
Array.from(tableBody.getElementsByTagName("tr")).forEach(row => {
if (row.style.display !== "none") {
const cb = row.querySelector(".row-select-input");
if (cb) {
cb.checked = isChecked;
if (isChecked) row.classList.add("row-is-selected");
else row.classList.remove("row-is-selected");
}
}
});
syncActionControls();
});
}
companyCheckboxes.forEach(cb => cb.addEventListener("change", filterListInventory));
if (listSearch) listSearch.addEventListener("input", filterListInventory);
categoryItems.forEach(item => {
item.addEventListener("click", function(e) {
e.preventDefault();
categoryItems.forEach(cat => cat.classList.remove("active-cat"));
this.classList.add("active-cat");
filterListInventory();
});
});
if (exportExcelBtn) {
exportExcelBtn.addEventListener("click", () => {
const checkedBoxes = tableBody.querySelectorAll(".row-select-input:checked");
const exportData = [["BRAND", "NEEDLE'S PROFILE", "SUTURE'S PROFILE", "COMPOSITION", "MRP (BOX/12PCS)"]];
checkedBoxes.forEach(cb => {
const tr = cb.closest("tr");
if (tr) {
const d = getTableRowData(tr);
exportData.push([d.brand, d.needle, d.suture, d.comp, d.mrp]);
}
});
if (typeof XLSX !== "undefined") {
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet(exportData);
XLSX.utils.book_append_sheet(wb, ws, "Surgical Profiles");
XLSX.writeFile(wb, "BDA_Surgical_Profiles_Matrix.xlsx");
} else {
alert("Excel Engine error: Please check SheetJS integration.");
}
});
}
if (shareWhatsappBtn) {
shareWhatsappBtn.addEventListener("click", function () {
const checkedBoxes = tableBody.querySelectorAll(".row-select-input:checked");
let msg = "BDA GLOBAL MATRIX - SURGICAL PROFILES\n========================================\n\n";
let idx = 1;
checkedBoxes.forEach(function (cb) {
const tr = cb.closest("tr");
if (tr) {
const d = getTableRowData(tr);
msg += idx + ". " + d.brand + "\n";
msg += "   • Needle: " + d.needle + "\n";
msg += "   • Suture: " + d.suture + "\n";
msg += "   • MRP: " + d.mrp + "\n\n";
idx++;
}
});
window.open("whatsapp.com" + encodeURIComponent(msg), "_blank");
});
}
tableBody.addEventListener("click", function (e) {
if (e.target && e.target.classList.contains("row-view-details")) {
e.preventDefault();
const tr = e.target.closest("tr");
const d = getTableRowData(tr);
alert("Opening detailed specification metrics for " + d.brand + ".\n\nNeedle Profile: " + d.needle + "\nSuture Profile: " + d.suture);
}
});
}
});
/**
• =================================================================================
• 🗺️ INDEPENDENT SITE MODULES: CONTACT FORM, MAP MODAL, TESTIMONIALS
• =================================================================================
*/
// 📞 SUB-MODULE A: REACH US PAGE PREMIUM CONTACT FORM
(function() {
document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("premiumContactForm");
const statusAlert = document.getElementById("formStatus");
if (!form) return;
const validateField = (inputEl, verificationCondition) => {
const groupContainer = inputEl.parentElement;
if (verificationCondition) {
groupContainer.classList.remove("invalid-trigger");
return true;
} else {
groupContainer.classList.add("invalid-trigger");
return false;
}
};
form.addEventListener("submit", (e) => {
e.preventDefault();
const name = document.getElementById("userName");
const email = document.getElementById("userEmail");
const phone = document.getElementById("userPhone");
const message = document.getElementById("userMessage");
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;
const isNameValid = validateField(name, name.value.trim() !== "");
const isEmailValid = validateField(email, emailRegex.test(email.value.trim()));
const isPhoneValid = validateField(phone, phoneRegex.test(phone.value.trim()));
const isMessageValid = validateField(message, message.value.trim() !== "");
if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
const btn = document.getElementById("submitBtn");
const btnText = btn.querySelector(".btn-text");
btn.style.pointerEvents = "none";
btnText.textContent = "Sending Verification...";
setTimeout(() => {
statusAlert.className = "status-alert success";
statusAlert.style.display = "block";
statusAlert.textContent = "Thank you! Your inquiry message request has been sent successfully.";
form.reset();
btn.style.pointerEvents = "auto";
btnText.textContent = "Send Message";
setTimeout(() => { statusAlert.style.display = "none"; }, 5000);
}, 1500);
}
});
form.querySelectorAll("input, textarea").forEach((element) => {
element.addEventListener("input", () => {
if (element.parentElement.classList.contains("invalid-trigger")) {
element.parentElement.classList.remove("invalid-trigger");
}
});
});
});
})();
// 📍 SUB-MODULE B: FLOATING MAP POPUP CONTROLLER
(function() {
document.addEventListener("DOMContentLoaded", function() {
const mapBtn = document.getElementById("openMapModal");
const mapModal = document.getElementById("mapModal");
const closeBtn = document.getElementById("closeMapModal");
if (mapBtn && mapModal) {
mapBtn.addEventListener("click", function(e) {
e.preventDefault();
mapModal.style.display = "flex";
});
}
if (closeBtn && mapModal) {
closeBtn.addEventListener("click", function() {
mapModal.style.display = "none";
});
}
window.addEventListener("click", function(e) {
if (e.target === mapModal) {
mapModal.style.display = "none";
}
});
});
})();
// 💬 SUB-MODULE C: TESTIMONIAL CLIENT REVIEWS FILTER ENGINE
(function() {
document.addEventListener("DOMContentLoaded", () => {
const filterButtons = document.querySelectorAll(".filter-btn");
const reviewCards = document.querySelectorAll(".review-card");
filterButtons.forEach((button) => {
button.addEventListener("click", () => {
filterButtons.forEach((btn) => btn.classList.remove("active"));
button.classList.add("active");
const filterValue = button.getAttribute("data-target");
reviewCards.forEach((card) => {
const cardCategory = card.getAttribute("data-category");
if (filterValue === "all" || filterValue === cardCategory) {
card.classList.remove("hide-card");
card.style.opacity = "0";
setTimeout(() => {
card.style.opacity = "1";
card.style.transition = "opacity 0.4s ease";
}, 50);
} else {
card.classList.add("hide-card");
}
});
});
});
});
})();
