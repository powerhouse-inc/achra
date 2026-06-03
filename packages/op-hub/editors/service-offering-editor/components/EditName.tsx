import { setName } from "document-model";
import type { FormEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import { useSelectedServiceOfferingDocument } from "../hooks/useServiceOfferingDocument.js";

/** Displays the name of the selected ServiceOffering document and allows editing it */
export function EditServiceOfferingName() {
  const [serviceOfferingDocument, dispatch] =
    useSelectedServiceOfferingDocument();
  const [isEditing, setIsEditing] = useState(false);

  if (!serviceOfferingDocument) return null;

  const serviceOfferingDocumentName = serviceOfferingDocument.header.name;

  const onClickEditServiceOfferingName: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsEditing(true);
  };

  const onClickCancelEditServiceOfferingName: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsEditing(false);
  };

  const onSubmitSetName: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const name = nameInput.value;
    if (!name) return;

    dispatch(setName(name));
    setIsEditing(false);
  };

  if (isEditing)
    return (
      <form
        className="flex gap-2 items-center justify-between"
        onSubmit={onSubmitSetName}
      >
        <input
          className="text-lg font-semibold text-gray-900 p-1"
          type="text"
          name="name"
          defaultValue={serviceOfferingDocumentName}
          autoFocus
        />
        <div className="flex gap-2">
          <button type="submit" className="text-sm text-gray-600">
            Save
          </button>
          <button
            className="text-sm text-red-800"
            onClick={onClickCancelEditServiceOfferingName}
          >
            Cancel
          </button>
        </div>
      </form>
    );

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-900">
        {serviceOfferingDocumentName}
      </h2>
      <button
        className="text-sm text-gray-600"
        onClick={onClickEditServiceOfferingName}
      >
        Edit Name
      </button>
    </div>
  );
}
