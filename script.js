let pairsData = {};
let currentPlayerRole = 0;

function showScreen(screenId, role = 0) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
    
    if(role > 0) {
        currentPlayerRole = role;
        document.getElementById('player-title').innerText = `Jugador ${role}`;
        document.getElementById('pair-number').value = "";
        document.getElementById('player-name').value = "";
        document.getElementById('player-response').value = "";
    }
    if(screenId === 'admin-screen') renderAdmin();
}

function saveData() {
    const pairNum = document.getElementById('pair-number').value;
    const name = document.getElementById('player-name').value;
    const resp = document.getElementById('player-response').value;

    if(!pairNum || !name || !resp) {
        alert("¡Ups! Olvidaste rellenar algún campo.");
        return;
    }

    if (!pairsData[pairNum]) {
        pairsData[pairNum] = { p1: null, p2: null };
    }

    pairsData[pairNum][`p${currentPlayerRole}`] = { name, response: resp };
    
    alert(`Datos de Pareja ${pairNum} enviados.`);
    showScreen('home-screen');
}

function renderAdmin() {
    const container = document.getElementById('admin-content');
    container.innerHTML = "";
    const pairs = Object.keys(pairsData);

    if (pairs.length === 0) {
        container.innerHTML = "<p>No hay datos registrados aún.</p>";
        return;
    }

    pairs.forEach(num => {
        const pairDiv = document.createElement('div');
        pairDiv.className = "pair-group";
        
        let html = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <h3 style="margin:0">Pareja #${num}</h3>
                <button onclick="deletePair('${num}')" style="background:#dc3545; padding:5px 10px; font-size:12px;">Eliminar Pareja</button>
            </div>
        `;

        [1, 2].forEach(pNum => {
            const data = pairsData[num][`p${pNum}`];
            html += `
                <div class="card">
                    <strong>Jugador ${pNum}:</strong> ${data ? data.name : '<span style="color:gray italic">Esperando...</span>'}
                    ${data ? `<p class="blur" onclick="this.classList.remove('blur')">${data.response}</p>` : ''}
                </div>
            `;
        });
        
        pairDiv.innerHTML = html;
        container.appendChild(pairDiv);
    });
}

function deletePair(num) {
    if(confirm(`¿Estás seguro de borrar toda la Pareja #${num}?`)) {
        delete pairsData[num];
        renderAdmin();
    }
}
