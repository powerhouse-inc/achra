import { Select } from "@powerhousedao/document-engineering/ui";
import { Icon } from "@powerhousedao/design-system";
import { ArrowBigRight, FileCheck } from "lucide-react";
import { useState } from "react";

interface SelectFieldProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function warningIcon() {
  return <Icon name="WarningFill" color="#eb4235" />;
}

function clockIcon() {
  return (
    <FileCheck
      style={{
        width: 24,
        height: 24,
        fill: "#475264",
        color: "white",
        padding: 0,
        margin: 0,
        borderColor: "#475264",
      }}
    />
  );
}

function checkCircleIcon(color: string) {
  return (
    <FileCheck style={{ width: 24, height: 24, fill: color, color: "white" }} />
  );
}

function arrowRightIcon(color: string) {
  return (
    <ArrowBigRight
      style={{ width: 22, height: 22, fill: color, color: color }}
    />
  );
}

const STATUS_OPTIONS_MAP = [
  {
    label: "Draft",
    value: "DRAFT",
    icon: () => arrowRightIcon("#1890ff"),
  },
  {
    label: "Issued",
    value: "ISSUED",
    icon: () => arrowRightIcon("#475264"),
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
    icon: warningIcon,
  },
  {
    label: "Accepted",
    value: "ACCEPTED",
    icon: () => checkCircleIcon("#475264"),
  },
  {
    label: "Rejected",
    value: "REJECTED",
    icon: warningIcon,
  },
  {
    label: "Payment Scheduled",
    value: "PAYMENTSCHEDULED",
    icon: clockIcon,
  },
  {
    label: "Payment Sent",
    value: "PAYMENTSENT",
    icon: clockIcon,
  },
  {
    label: "Payment Issue",
    value: "PAYMENTISSUE",
    icon: warningIcon,
  },
  {
    label: "Payment Received",
    value: "PAYMENTRECEIVED",
    icon: () => checkCircleIcon("#34a853"),
  },
  {
    label: "Payment Closed",
    value: "PAYMENTCLOSED",
    icon: () => checkCircleIcon("#475264"),
  },
];

export const SelectField = (props: SelectFieldProps) => {
  const { value: status, onChange } = props;
  const [selectKey, setSelectKey] = useState(0);

  // Determine what options to show
  const draftActions = [
    {
      label: "Draft",
      value: "DRAFT",
      icon: () => arrowRightIcon("#1890ff"),
    },
    {
      label: "Issue Invoice",
      value: "ISSUE_INVOICE",
    },
    {
      label: "Cancel Invoice",
      value: "CANCEL_INVOICE",
    },
  ];

  const cancelledActions = [
    {
      label: "Cancelled",
      value: "CANCELLED",
      icon: warningIcon,
    },
    {
      label: "Reset Invoice",
      value: "RESET_INVOICE",
    },
  ];

  const issuedActions = [
    {
      label: "Issued",
      value: "ISSUED",
      icon: () => arrowRightIcon("#475264"),
    },
    {
      label: "Reject Invoice",
      value: "REJECT_INVOICE",
    },
    {
      label: "Accept Invoice",
      value: "ACCEPT_INVOICE",
    },
  ];

  const rejectedActions = [
    {
      label: "Rejected",
      value: "REJECTED",
      icon: warningIcon,
    },
    {
      label: "Re-instate Invoice",
      value: "RE_INSTATE_INVOICE",
    },
  ];

  const acceptedActions = [
    {
      label: "Accepted",
      value: "ACCEPTED",
      icon: () => checkCircleIcon("#475264"),
    },
    {
      label: "Schedule Payment",
      value: "SCHEDULE_PAYMENT",
    },
    {
      label: "Close Payment",
      value: "CLOSE_PAYMENT",
    },
  ];

  const paymentScheduledActions = [
    {
      label: "Payment Scheduled",
      value: "PAYMENTSCHEDULED",
      icon: clockIcon,
    },
    {
      label: "Register Payment",
      value: "REGISTER_PAYMENT",
    },
    {
      label: "Report Payment Issue",
      value: "REPORT_PAYMENT_ISSUE",
    },
    {
      label: "Close Payment",
      value: "CLOSE_PAYMENT",
    },
  ];

  const paymentSentActions = [
    {
      label: "Payment Sent",
      value: "PAYMENTSENT",
      icon: clockIcon,
    },
    {
      label: "Report Payment Issue",
      value: "REPORT_PAYMENT_ISSUE",
    },
    {
      label: "Confirm Payment",
      value: "CONFIRM_PAYMENT",
    },
  ];

  const paymentIssueActions = [
    {
      label: "Payment Issue",
      value: "PAYMENTISSUE",
      icon: warningIcon,
    },
    {
      label: "Re-approve Payment",
      value: "RE_APPROVE_PAYMENT",
    },
    {
      label: "Close Payment",
      value: "CLOSE_PAYMENT",
    },
  ];

  const paymentReceivedActions = [
    {
      label: "Payment Received",
      value: "PAYMENTRECEIVED",
      icon: () => checkCircleIcon("#34a853"),
    },
    {
      label: "Report Payment Issue",
      value: "REPORT_PAYMENT_ISSUE",
    },
  ];

  const paymentClosedActions = [
    {
      label: "Payment Closed",
      value: "PAYMENTCLOSED",
      icon: () => checkCircleIcon("#475264"),
    },
    {
      label: "Re-approve Payment",
      value: "RE_APPROVE_PAYMENT",
    },
  ];

  const optionsToShow = () => {
    switch (status) {
      case "DRAFT":
        return draftActions;
      case "ISSUED":
        return issuedActions;
      case "CANCELLED":
        return cancelledActions;
      case "ACCEPTED":
        return acceptedActions;
      case "REJECTED":
        return rejectedActions;
      case "PAYMENTSCHEDULED":
        return paymentScheduledActions;
      case "PAYMENTSENT":
        return paymentSentActions;
      case "PAYMENTISSUE":
        return paymentIssueActions;
      case "PAYMENTRECEIVED":
        return paymentReceivedActions;
      case "PAYMENTCLOSED":
        return paymentClosedActions;
      default:
        return STATUS_OPTIONS_MAP.filter((opt) => opt.value === status);
    }
  };

  // Stateless handleChange
  const handleChange = (value: string | string[]) => {
    setSelectKey((k) => k + 1);
    if (typeof value === "string") {
      if (status === "DRAFT") {
        if (value === "ISSUE_INVOICE") onChange("ISSUED");
        else if (value === "CANCEL_INVOICE") onChange("CANCELLED");
      } else if (status === "CANCELLED") {
        if (value === "RESET_INVOICE") onChange("DRAFT");
      } else if (status === "ISSUED") {
        if (value === "REJECT_INVOICE") onChange("REJECTED");
        else if (value === "ACCEPT_INVOICE") onChange("ACCEPTED");
      } else if (status === "REJECTED") {
        if (value === "RE_INSTATE_INVOICE") onChange("ISSUED");
      } else if (status === "ACCEPTED") {
        if (value === "SCHEDULE_PAYMENT") onChange("PAYMENTSCHEDULED");
        else if (value === "CLOSE_PAYMENT") onChange("PAYMENTCLOSED");
      } else if (status === "PAYMENTSCHEDULED") {
        if (value === "REGISTER_PAYMENT") onChange("PAYMENTSENT");
        else if (value === "REPORT_PAYMENT_ISSUE") onChange("PAYMENTISSUE");
        else if (value === "CLOSE_PAYMENT") onChange("PAYMENTCLOSED");
      } else if (status === "PAYMENTSENT") {
        if (value === "REPORT_PAYMENT_ISSUE") onChange("PAYMENTISSUE");
        else if (value === "CONFIRM_PAYMENT") onChange("PAYMENTRECEIVED");
      } else if (status === "PAYMENTISSUE") {
        if (value === "RE_APPROVE_PAYMENT") onChange("ACCEPTED");
        else if (value === "CLOSE_PAYMENT") onChange("PAYMENTCLOSED");
      } else if (status === "PAYMENTRECEIVED") {
        if (value === "REPORT_PAYMENT_ISSUE") onChange("PAYMENTISSUE");
      } else if (status === "PAYMENTCLOSED") {
        if (value === "RE_APPROVE_PAYMENT") onChange("ACCEPTED");
      }

      // Optionally, handle other statuses/actions here
    }
  };

  return (
    <Select
      key={selectKey}
      style={{ width: 230 }}
      options={optionsToShow()}
      value={status || "DRAFT"}
      onChange={handleChange}
      selectionIcon="checkmark"
      selectionIconPosition="left"
      defaultValue={STATUS_OPTIONS_MAP[0].value} // Draft is the default
    />
  );
};
