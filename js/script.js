const banner = document.getElementById("announcementBar");
banner?.querySelector(".announcement-close")?.addEventListener("click", () => banner.remove());

const track = document.querySelector(".testimonials-track");

if (track) {
    const cards = [...track.children];
    const step = () =>
        cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;

    track.scrollLeft = step();

    document.querySelector(".testimonial-arrow.prev")?.addEventListener("click", () => {
        track.scrollBy({ left: -step(), behavior: "smooth" });
    });

    document.querySelector(".testimonial-arrow.next")?.addEventListener("click", () => {
        track.scrollBy({ left: step(), behavior: "smooth" });
    });
};

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        panels[i].classList.add("active");
    });
});

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartCount = document.getElementById("cartCount");

const updateCartBadge = () => {
    if (!cartCount) return;
    try {
        const items = JSON.parse(localStorage.getItem("shopco_cart") || "[]");
        const total = Array.isArray(items)
            ? items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
            : 0;
        cartCount.textContent = String(total);
    } catch {
        cartCount.textContent = "0";
    }
};

updateCartBadge();

if (cartBtn && cartDrawer) {
    cartBtn.addEventListener("click", () => {
        if (!cartDrawer.open) {
            cartDrawer.showModal();
        }
    });
}

const logoutBtn = document.getElementById("logoutBtn");
const accountDropdown = document.getElementById("accountDropdown");

logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("shopco_user");
    accountDropdown?.hidePopover?.();
});

const heroCta = document.querySelector(".hero-cta");
if (heroCta && heroCta.tagName === "BUTTON") {
    heroCta.addEventListener("click", () => {
        window.location.href = "pages/shop.html";
    });
}

const newsletterForm = document.querySelector(".newsletter-form");
newsletterForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailInput = newsletterForm.querySelector(".newsletter-input");
    const email = emailInput?.value.trim();

    if (!email || !emailInput.checkValidity()) {
        emailInput?.focus();
        return;
    }

    let status = newsletterForm.querySelector(".newsletter-status");
    if (!status) {
        status = document.createElement("p");
        status.className = "newsletter-status";
        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");
        newsletterForm.appendChild(status);
    }

    status.textContent = `Thanks for subscribing, ${email}!`;
    newsletterForm.reset();
});


