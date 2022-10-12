# SW6 Plugin: BalPatchAdministrationMediaUploadTypeValidation

Temporärer Patch für die Validierung des Medien-Upload-Typs bis Änderungs-Anfrage https://github.com/shopware/platform/pull/2713 übernommen wurde

Überschreibt die Methode **checkFileType** in der Komponente **sw-media-upload-v2**.

Damit werden alle gültigen Accept-Eingaben validiert.
