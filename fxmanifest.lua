fx_version "cerulean"

lua54 'yes'

games {
  "gta5",
  "rdr3"
}

ui_page 'web/build/index.html'

client_script {
  "client/**/*",
  "config.lua"
}

files {
	'web/build/index.html',
	'web/build/**/*',
}

escrow_ignore {
  "client/**/*",
  "config.lua"
}