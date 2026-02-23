const geradorSelect = document.getElementById("geradorSelect");
const potenciaGroup = document.getElementById("potenciaGroup");

geradorSelect.addEventListener("change", function() {
  if (this.value === "Sim") {
    potenciaGroup.style.display = "flex";
  } else {
    potenciaGroup.style.display = "none";
  }
});