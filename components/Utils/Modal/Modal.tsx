/** @jsxImportSource @emotion/react */
import React, { forwardRef, ReactNode } from "react";
import { css } from "@emotion/react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  sx?: React.CSSProperties;
  backdropStyle?: React.CSSProperties;
  disableBackdropClick?: boolean;
  parentModal?: boolean;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      children,
      sx = {},
      backdropStyle = {},
      disableBackdropClick = false,
      parentModal = true,
    },
    ref
  ) => {
    if (!open) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (!disableBackdropClick) {
        onClose();
      }
      e.stopPropagation();
    };

    return (
      <div
        css={css({
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: parentModal
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(0, 0, 0, 0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: parentModal ? 1300 : 1400,
          ...backdropStyle,
        })}
        onClick={handleBackdropClick}
      >
        <div
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          css={css({
           
           
            maxWidth: "90%",
            outline: "none",
            zIndex: parentModal ? 1301 : 1401,
            ...sx,
          })}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default Modal;
