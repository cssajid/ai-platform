"use client";

import { useState } from "react";
import modelsConfig from "../../../config/models.json";
import styles from "./SettingsModal.module.css";

interface Props {
  currentModel: string;
  onSave: (model: string) => void;
  onClose: () => void;
}

export default function SettingsModal({
  currentModel,
  onSave,
  onClose
}: Props) {
  const [selectedModel, setSelectedModel] =
    useState(currentModel);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Settings</h3>

        <div className={styles.field}>
          <label>Language Model</label>

          <select
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
            className={styles.select}
          >
            {modelsConfig.map(model => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>

          <p className={styles.description}>
            {
              modelsConfig.find(
                m => m.id === selectedModel
              )?.description
            }
          </p>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.cancelBtn}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={styles.saveBtn}
            onClick={() => onSave(selectedModel)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
