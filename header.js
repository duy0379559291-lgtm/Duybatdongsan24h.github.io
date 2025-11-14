document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const guestArea  = document.getElementById("guestArea");
        const userArea   = document.getElementById("userArea");
        const userNameEl = document.getElementById("userNameShort");
        const userPill   = document.getElementById("userPill");
        const userMenu   = document.getElementById("userMenu");
        const btnLogout  = document.getElementById("btnLogout");
        const btnUserInfo = document.getElementById("btnUserInfo");

        let customerRaw = localStorage.getItem("lvdCustomer");

        if (customerRaw) {
            try {
                const customer = JSON.parse(customerRaw);
                const fullName = customer.name || "Khách hàng";
                const shortName = fullName.split(" ").pop();

                guestArea.style.display = "none";
                userArea.style.display = "flex";
                userNameEl.textContent = shortName;

            } catch (e) {
                console.error("Lỗi đọc dữ liệu người dùng:", e);
            }
        }

        if (userPill) {
            userPill.onclick = () => {
                userMenu.style.display = userMenu.style.display === "block" ? "none" : "block";
            };
        }

        document.addEventListener("click", function (e) {
            if (userArea && !userArea.contains(e.target)) {
                if (userMenu) userMenu.style.display = "none";
            }
        });

        if (btnUserInfo) {
            btnUserInfo.onclick = () => {
                const data = JSON.parse(localStorage.getItem("lvdCustomer") || "{}");
                alert(
                    "Tên: " + (data.name || "") +
                    "\nSĐT: " + (data.phone || "") +
                    "\nEmail: " + (data.email || "") +
                    "\nĐịa chỉ: " + (data.address || "")
                );
            };
        }

        if (btnLogout) {
            btnLogout.onclick = () => {
                localStorage.removeItem("lvdCustomer");
                location.reload();
            };
        }
    }, 100);
});
