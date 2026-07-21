const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}


const memberGrid = document.querySelector("#member-list");
const memberToggle = document.querySelector(".member-toggle");

if (memberGrid && memberToggle) {
  memberToggle.addEventListener("click", () => {
    const isExpanded = memberGrid.classList.toggle("members-expanded");
    memberToggle.setAttribute("aria-expanded", String(isExpanded));
    memberToggle.textContent = isExpanded ? "Show fewer members" : "Show all 15 members";

    if (!isExpanded) {
      document.querySelector("#members")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

const memberModal = document.querySelector("#member-modal");
const memberModalName = document.querySelector("#member-modal-name");
const memberModalRole = document.querySelector("#member-modal-role");
const memberModalBio = document.querySelector("#member-modal-bio");
const memberModalInitials = document.querySelector("#member-modal-initials");
const memberModalPhoto = document.querySelector("#member-modal-photo");
let lastOpenedMemberCard = null;

function openMemberProfile(card) {
  if (!memberModal || !card) return;
  lastOpenedMemberCard = card;
  memberModalName.textContent = card.dataset.name || "";
  memberModalRole.textContent = card.dataset.role || "";
  memberModalBio.textContent = card.dataset.bio || "";
  memberModalInitials.textContent = card.dataset.initials || "";

  const photo = card.dataset.photo;
  if (photo) {
    memberModalPhoto.style.backgroundImage = `url("${photo}")`;
    memberModalPhoto.classList.add("has-photo");
  } else {
    memberModalPhoto.style.backgroundImage = "";
    memberModalPhoto.classList.remove("has-photo");
  }

  memberModal.classList.add("open");
  memberModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  memberModal.querySelector(".member-modal-close")?.focus();
}

function closeMemberProfile() {
  if (!memberModal) return;
  memberModal.classList.remove("open");
  memberModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastOpenedMemberCard?.focus();
}

document.querySelectorAll(".member-card[role='button']").forEach((card) => {
  card.addEventListener("click", () => openMemberProfile(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMemberProfile(card);
    }
  });
});

document.querySelectorAll("[data-close-member-modal]").forEach((control) => {
  control.addEventListener("click", closeMemberProfile);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && memberModal?.classList.contains("open")) {
    closeMemberProfile();
  }
});
