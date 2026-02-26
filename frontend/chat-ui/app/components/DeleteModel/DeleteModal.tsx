"use client";

import styles from "./DeleteModal.module.css";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({
  onConfirm,
  onCancel
}: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h4 className={styles.title}>
          Delete Chat?
        </h4>

        <p className={styles.text}>
          This action cannot be undone.
        </p>

        <div className={styles.actions}>
          <button
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className={styles.deleteBtn}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
