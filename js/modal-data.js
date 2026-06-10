/**
 * Modal Content Data
 * Centralized content for all modal sections
 */

export const MODAL_DATA = {
  quien: {
    emoji: '👁️',
    tag: 'Identidad',
    title: '¿Quién soy?',
    html: `
      <p>Soy el <strong>Diablo Uma</strong>. En kichwa, mi nombre significa <em>"Cabeza de Diablo"</em> — uma es cabeza, y llevo en mi máscara toda la fuerza de los Andes.</p>
      <div class="highlight"><p>"No soy el mal. Soy el guardián de la fiesta, el que aleja lo que daña y protege a quienes celebran."</p></div>
      <p>Mi máscara de lata pintada a mano, mis cuernos imponentes y mi traje multicolor me hacen inconfundible. Danzo entre la multitud con energía desbordante, generando <strong>asombro, risa y devoción</strong> a partes iguales.</p>
      <p>Aunque llevo la imagen del "diablo" de la tradición colonial, los pueblos andinos transformaron esa figura en símbolo de celebración y resistencia. Soy prueba de que la cultura puede reinterpretar y vencer cualquier imposición.</p>
    `
  },
  historia: {
    emoji: '📖',
    tag: 'Historia',
    title: 'Mi historia',
    html: `
      <p>Mis raíces se hunden en la era colonial, cuando los pueblos kichwa de los Andes fusionaron su cosmovisión ancestral con los símbolos impuestos por la evangelización española.</p>
      <p>Los misioneros usaron la figura del diablo para infundir temor. Los pueblos indígenas respondieron apropiándose de ella: la vistieron con colores, le pusieron a bailar y la convirtieron en <strong>celebración</strong>. Fue un acto silencioso y poderoso de resistencia cultural.</p>
      <div class="highlight"><p>"Tomaron nuestra imagen del miedo y la hicieron danzar. Así nació el Diablo Uma."</p></div>
      <p>Con el paso de los siglos, la artesanía evolucionó. La máscara fue primero de madera tallada. En el siglo XX, los artesanos de Riobamba comenzaron a trabajar el <strong>hojalate</strong> — una lámina de acero fina — creando piezas más ligeras, más coloridas y más elaboradas.</p>
      <p>Hoy la elaboración de la máscara de lata es un arte que pasa de padres a hijos, declarado <strong>Patrimonio Cultural Inmaterial del Ecuador</strong> por el Instituto Nacional de Patrimonio Cultural.</p>
    `
  },
  tradicion: {
    emoji: '🏛️',
    tag: 'Riobamba',
    title: 'Tradición y fiesta',
    html: `
      <p>En Riobamba, capital de Chimborazo, mi presencia es el corazón del <strong>Pase del Niño</strong> — una de las festividades más importantes de toda la Sierra ecuatoriana, celebrada entre diciembre y enero.</p>
      <p>Las calles de la ciudad se transforman: comparsas, bandas de pueblo, caballos adornados con flores y castillos de fuegos artificiales crean un escenario único. Yo encabezo los desfiles, marcando el ritmo con mis pasos frenéticos.</p>
      <div class="highlight"><p>"La fiesta mezcla la devoción cristiana al Niño Jesús con rituales andinos que vienen de mucho antes de la conquista. Esa mezcla es Riobamba."</p></div>
      <p>Las máscaras de Diablo Uma fabricadas en Riobamba son reconocidas en todo el país por su <strong>calidad artesanal</strong>. Cada pieza es pintada a mano con motivos geométricos, serpientes bicéfalas, soles, estrellas y figuras de la cosmovisión andina — cada trazo tiene un significado.</p>
      <p>Visitar el taller de un artesano mascarero en Riobamba es una experiencia irrepetible. Muchos talleres están en el barrio histórico y reciben visitantes durante todo el año.</p>
    `
  },
  foto: {
    emoji: '🌐',
    tag: 'Realidad Aumentada',
    title: 'Tu foto con el Diablo Uma',
    html: `<div id="camblock"></div><button id="native-ar-btn" style="display:none;margin-top:10px;width:100%;padding:10px;border-radius:50px;border:2px solid var(--primary);background:transparent;color:var(--primary);font-family:var(--sans);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;font-weight:600" onclick="document.getElementById('ar-trigger')?.click()">🌐 Abrir en AR nativo</button>`
  }
};
