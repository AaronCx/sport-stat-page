function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  for (const c of children) node.appendChild(c);
  return node;
}

function buildHeaderRow(teams) {
  const tr = el("tr");
  tr.appendChild(el("th", { class: "tm", scope: "col", text: "Tm" }));
  for (const t of teams) tr.appendChild(el("th", { scope: "col", text: t }));
  return tr;
}

function buildMatrixTable(data) {
  const teams = data.teams;
  const wins = data.wins || {};

  const table = el("table", { class: "matrix", role: "table" });

  const thead = el("thead");
  thead.appendChild(buildHeaderRow(teams));
  table.appendChild(thead);

  const tbody = el("tbody");
  for (const rowTeam of teams) {
    const tr = el("tr");
    tr.appendChild(el("th", { class: "rowhdr", scope: "row", text: rowTeam }));

    for (const colTeam of teams) {
      if (rowTeam === colTeam) {
        tr.appendChild(el("td", { class: "diag", text: "--" }));
      } else {
        const val = wins?.[rowTeam]?.[colTeam];
        tr.appendChild(el("td", { text: (val === undefined || val === null) ? "" : String(val) }));
      }
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  const tfoot = el("tfoot");
  tfoot.appendChild(buildHeaderRow(teams));
  table.appendChild(tfoot);

  return table;
}

async function main() {
  const mount = document.getElementById("tableMount");
  mount.innerHTML = "";

  try {
    const res = await fetch("./data.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load data.json (${res.status})`);
    const data = await res.json();

    // Basic validation
    if (!Array.isArray(data.teams) || typeof data.wins !== "object") {
      throw new Error("Invalid JSON shape. Expected { teams: [...], wins: { ... } }");
    }

    const table = buildMatrixTable(data);
    mount.appendChild(table);

    mount.appendChild(
      el("div", { class: "note" }, [
        el("div", { text: "Tip: edit data.json to swap teams/values. Diagonal is always '--'." })
      ])
    );
  } catch (err) {
    mount.appendChild(el("div", { class: "loading", text: `Error: ${err.message}` }));
  }
}

main();
