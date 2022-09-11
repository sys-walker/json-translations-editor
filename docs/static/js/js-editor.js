function aux_update_download_files(pLanguage) {
  let listOfDownloads = document.getElementById('downloadables-files')?.getElementsByTagName('li');
  if (listOfDownloads) {
    let parentList = listOfDownloads[0].parentNode;
    let arr = Array.prototype.slice.call(listOfDownloads);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].innerText.includes(`${pLanguage}.json`)) {
        parentList.removeChild(arr[i]);
        break;
      }
    }
  }
}
function remove_by_language() {
  let column_name = get_option_selected();
  let rows = document.getElementById('translation-table').rows;
  let deleted = false;
  if (column_name === '') {
    return;
  }
  for (let i = 0; i < rows[0].cells.length; i++) {
    if (rows[0].cells[i].innerText === column_name) {
      for (let j = 0; j < rows.length; j++) {
        rows[j].deleteCell(i);
      }
      deleted = true;
    }
  }
  if (deleted) {
    add_languages_select();
    aux_update_download_files(column_name);
  }
}
function switchDarkmodeText(nativeElement) {
  if (nativeElement === undefined) {
    nativeElement = document.getElementById('darkmode-button');
    if (nativeElement === undefined) {
      return;
    }
  }
  if (darkmode.readValue(DarkMode.DATA_KEY) === 'light') {
    switchIconsTo('light');
    nativeElement.innerText = 'Dark Mode';
  } else {
    switchIconsTo('dark');
    nativeElement.innerText = 'Light Mode';
  }
}
function onLoadTranslator() {
  add_languages_select();
  switchDarkmodeText(undefined);
}
function deleteRow(r) {
  let i = r.parentNode.parentNode.rowIndex;
  document.getElementById('translation-table').deleteRow(i);
}
function delete_by_key() {
  /*
            <div >
                <label for="fname">Translation key:</label>
                <input type="text" id="deletion-input" name="fname" value="John">
                <button type="button"
                onclick="delete_by_key()" >
                delete by key</button>
            </div>
        */
  let translation_key = document.getElementById('deletion-input').value;
  let rows = document.getElementById('translation-table').rows;
  let colum_table_key = rows[0].cells[0];
  let index_to_delete = -1;
  if (translation_key === '') {
    return;
  }
  for (let j = 0; j < rows.length; j++) {
    if (rows[j].cells[0].innerText === translation_key) {
      index_to_delete = j;
      break;
    }
  }
  if (index_to_delete !== -1) {
    document.getElementById('translation-table').deleteRow(index_to_delete);
  }
}
function get_table_sizes() {
  //count of rows of table
  let rows = document.getElementById('translation-table').rows;
  let num_rows = 0;
  for (let j = 0; j < rows.length; j++) {
    num_rows += 1;
  }
  //Count columns
  let num_columns = rows[0].cells.length;
  return { num_columns: num_columns, num_rows: num_rows };
}
function add_translation() {
  const { num_columns, num_rows } = get_table_sizes();
  if (num_columns > 2) {
    let table = document.getElementById('translation-table').getElementsByTagName('tbody')[0];
    // Create an empty <tr> element and add it to the 1st position of the table:
    let row = table.insertRow(num_rows - 1);
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    for (let j = 0; j < num_columns; j++) {
      let cell = row.insertCell(j);
      if (j === num_columns - 1) {
        cell.innerHTML = "<input type='button' value='Delete' class='btn btn-danger' onclick='deleteRow(this)'>";
      } else {
        cell.innerHTML = "<input class='input-translation form-control' type='' id='' name='' value=''>";
      }
    }
  }
}
function add_new_language() {
  let new_language = document.getElementById('deletion-input').value;
  if (new_language === '') {
    return;
  }
  let table = document.getElementById('translation-table'),
    rows = table.rows;

  const { num_columns, num_rows } = get_table_sizes();

  let i = num_columns - 1;
  for (let j = 0; j < rows.length; j++) {
    if (j === 0) {
      let p = rows[j].insertCell(i);
      p.outerHTML = `<th>${new_language}</th>`;
    } else {
      let p = rows[j].insertCell(i);
      p.innerHTML = "<input class='input-translation form-control' type='text' id='' name='' value=''>";
    }
  }
  add_languages_select();
}
function get_translator_languages() {
  const { num_columns, num_rows } = get_table_sizes();
  if (num_columns >= 3) {
    let available_langauges = [];
    for (let j = 1; j < num_columns - 1; j++) {
      let lang = document.getElementById('translation-table').rows[0].cells[j].innerText;
      available_langauges.push(lang);
    }
    return available_langauges;
  }
  return [];
}
function add_languages_select() {
  const { num_columns, num_rows } = get_table_sizes();
  if (num_columns === 2) {
    let select = document.getElementById('selectElementId');
    select.innerHTML = '';
    let opt = document.createElement('option');
    opt.value = '';
    opt.innerHTML = 'No languages';
    select.appendChild(opt);
  } else {
    let languages = get_translator_languages();
    let select = document.getElementById('selectElementId');
    select.innerHTML = '';

    languages.forEach((locale) => {
      let opt = document.createElement('option');
      opt.value = locale;
      opt.innerHTML = locale;
      select.appendChild(opt);
    });
  }
}
function get_option_selected() {
  let e = document.getElementById('selectElementId');
  let value = e.options[e.selectedIndex].value;
  return value;
}
function aux_find_column_by_locale(locale) {
  let rows = document.getElementById('translation-table').rows;
  const { num_columns, num_rows } = get_table_sizes();
  for (let j = 0; j < num_columns; j++) {
    if (rows[0].cells[j].innerText === locale) {
      return j;
    }
  }
  return -1;
}
function aux_get_translation_values_from(locale) {
  const { num_columns, num_rows } = get_table_sizes();
  const rows = document.getElementById('translation-table').rows;
  const locale_column = aux_find_column_by_locale(locale);
  let translationValues = [];
  if (locale_column !== -1) {
    for (let j = 1; j < rows.length; j++) {
      let v = rows[j].cells[locale_column].children[0].value;
      translationValues.push(v);
    }
  }
  return translationValues;
}
function aux_get_translator_keys() {
  let rows = document.getElementById('translation-table').rows;
  const { num_columns, num_rows } = get_table_sizes();
  let translationKeys = [];
  for (let j = 1; j < num_rows; j++) {
    k = rows[j].cells[0].children[0].value; // la cell indica la columna de idioma en aquest cas es la columna de keys
    translationKeys.push(k);
  }
  return translationKeys;
}
function aux_create_dictionary(translationKeys, translationValues) {
  let translations_dictioanry = {};
  let i = 0;
  translationKeys.forEach((k) => {
    if (k !== '') {
      translations_dictioanry[k] = translationValues[i++];
    }
  });
  return translations_dictioanry;
}
function aux_create_formated_json(jsonData) {
  //receives raw flat JSON by default
  let flatFiles = document.querySelector('input[name=flatJSON]:checked').value;

  if (!JSON.parse(flatFiles)) {
    console.log('Unflattening json');
    let unflattered = Object.unflatten(jsonData);
    jsonData = unflattered;
  }

  let text = JSON.stringify(jsonData, null, 4);
  return text;
}

function aux_create_URLObject_json(jsonData) {
  let file = new Blob([jsonData], { type: 'application/json' });
  return URL.createObjectURL(file);
}

function download_languages() {
  let files_to_download = {};
  let translatorLanguages = get_translator_languages();
  let translatorKeys = aux_get_translator_keys();
  if (translatorLanguages.length === 0) {
    return;
  }
  if (translatorKeys.length === 0) {
    return;
  }

  translatorLanguages.forEach((locale) => {
    let jsonData = aux_create_dictionary(translatorKeys, aux_get_translation_values_from(locale));
    files_to_download[locale] = aux_create_URLObject_json(aux_create_formated_json(jsonData));
  });

  //Create list of downloads
  let ul = document.createElement('ul');
  ul.id = 'downloadables-files';
  ul.classList.add('list-group');
  ul.classList.add('list-group-flush');

  let colorsScheme = `${getColorsMode() === 'light' ? '' : '-dark'}`;
  let themedIcon_src = `static/img/json-file-icon${colorsScheme}.svg`;

  translatorLanguages.forEach((locale) => {
    let li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `<img src="${themedIcon_src}" style="width: 38px;margin-right: 1em;"> <a href="${files_to_download[locale]}" class="dowloadLink" download="${locale}.json">[${locale}.json] i18n file</a>`;
    ul.appendChild(li);
  });
  document.getElementById('translation-list-files').innerHTML = '';
  document.getElementById('translation-list-files').appendChild(ul);
}
function switchIconsTo(mode) {
  console.log('Called to switch icons');
  var list = document.getElementsByClassName('icon-switchable');
  if (mode === 'light') {
    for (var i = 0; i < list.length; i++) {
      let icon_src = list[i].src;
      if (icon_src.includes('-dark.svg')) {
        list[i].src = icon_src.replace('-dark.svg', '.svg');
      } else {
        console.log('already light icon');
      }
    }
  } else {
    console.log('switching to dark');
    for (var i = 0; i < list.length; i++) {
      let icon_src = list[i].src;
      if (icon_src.includes('-dark.svg')) {
        console.log('already dark icon');
      } else {
        list[i].src = icon_src.replace('.svg', '-dark.svg');
      }
    }
  }
}
function getColorsMode() {
  if (darkmode.readValue(DarkMode.DATA_KEY) === 'light') {
    return 'light';
  } else {
    return 'dark';
  }
}
//Functions to flat or unflat JSON
//https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-javascript-objects#:~:text=Flatten%20a%20JSON%20object%3A,))%20%7B%20var%20length%20%3D%20table.
Object.unflatten = function (data) {
  'use strict';
  if (Object(data) !== data || Array.isArray(data)) return data;
  var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
    resultholder = {};
  for (var p in data) {
    var cur = resultholder,
      prop = '',
      m;
    while ((m = regex.exec(p))) {
      cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
      prop = m[2] || m[1];
    }
    cur[prop] = data[p];
  }
  return resultholder[''] || resultholder;
};

Object.flatten = function (data) {
  var result = {};
  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++) recurse(cur[i], prop + '[' + i + ']');
      if (l == 0) result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + '.' + p : p);
      }
      if (isEmpty && prop) result[prop] = {};
    }
  }
  recurse(data, '');
  return result;
};

function download_zip_of_languages() {
  let translatorLanguages = get_translator_languages();
  let translatorKeys = aux_get_translator_keys();
  if (translatorLanguages.length === 0) {
    return;
  }
  if (translatorKeys.length === 0) {
    return;
  }

  let zip = new JSZip();
  translatorLanguages.forEach((locale) => {
    let jsonData = aux_create_dictionary(translatorKeys, aux_get_translation_values_from(locale));
    zip.file(`${locale}.json`, aux_create_formated_json(jsonData));
  });

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    // see FileSaver.js
    saveAs(content, 'i18n.zip');
  });
}
