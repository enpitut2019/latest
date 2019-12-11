all: bin/Latest.js bin/background.js

bin/Latest.js: ./src/main.ts ./src/DB.ts ./src/Elements.ts ./src/ManageID.ts ./src/Mode.ts ./src/Form.ts ./src/URL.ts
		tsc src/main.ts src/DB.ts src/Elements.ts src/ManageID.ts src/Mode.ts src/Form.ts src/URL.ts --out bin/Latest.js --target es2015

bin/background.js: ./src/background.ts
		tsc src/background.ts --out bin/background.js