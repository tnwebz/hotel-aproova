export type AvailabilityType = "ALWAYS" | "TIME_SLOT" | "DINNER";

export type MealPeriod =
  | "ALL"
  | "BREAKFAST"
  | "LUNCH"
  | "EVENING_SNACKS"
  | "DINNER"
  | "ALL_DAY";

export interface MealPeriodConfig {
  id: MealPeriod;
  label: string;
  icon?: string;
  timeRangeLabel: string;
  categoryIds: string[];
}

export const MEAL_PERIOD_CONFIGS: MealPeriodConfig[] = [
  {
    id: "BREAKFAST",
    label: "Breakfast",
    icon: "🍳",
    timeRangeLabel: "Opening – 11:59 AM",
    categoryIds: ["tiffin", "dosa", "rava-roast", "uthappam", "beverages"],
  },
  {
    id: "LUNCH",
    label: "Lunch",
    icon: "🍛",
    timeRangeLabel: "12:00 PM – 3:30 PM",
    categoryIds: [
      "meals",
      "variety-rice",
      "parotta-chappathi",
      "tandoori-starters",
      "starters",
      "soup",
      "main-course",
      "tandoori-roti",
      "tandoori-naan-kulcha",
      "rice-pulao-noodles",
      "indian-main-course",
    ],
  },
  {
    id: "EVENING_SNACKS",
    label: "Evening Snacks",
    icon: "☕",
    timeRangeLabel: "3:00 PM – 6:00 PM",
    categoryIds: [
      "chaat",
      "snacks",
      "sandwich",
      "kids-special",
      "apoorvaa-special-pasta",
      "beverages",
      "juice",
      "ice-creams-milk-shake",
    ],
  },
  {
    id: "DINNER",
    label: "Dinner",
    icon: "🌙",
    timeRangeLabel: "6:00 PM – 11:00 PM",
    categoryIds: [
      "parotta-chappathi",
      "tandoori-starters",
      "starters",
      "soup",
      "main-course",
      "tandoori-roti",
      "tandoori-naan-kulcha",
      "rice-pulao-noodles",
      "indian-main-course",
      "tiffin",
      "dosa",
    ],
  },
];

/**
 * Gets current time in Asia/Kolkata (Hotel Apoorvaa local restaurant timezone)
 */
export function getKolkataDate(date: Date = new Date()): Date {
  const kolkataDateStr = date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  return new Date(kolkataDateStr);
}

/**
 * Parses time string (e.g. "12:00", "15:30", "08:00") into minutes from midnight
 */
function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + (minutes || 0);
}

export interface AvailabilityStatus {
  isAvailable: boolean;
  statusText?: string;
  timingLabel?: string;
}

/**
 * Authoritative availability checker for Hotel Apoorvaa menu items.
 * Evaluates in Asia/Kolkata timezone.
 */
export function isItemAvailable(
  item: {
    availabilityType: AvailabilityType;
    startTime?: string;
    endTime?: string;
  },
  currentDate: Date = new Date()
): boolean {
  if (item.availabilityType === "ALWAYS") {
    return true;
  }

  const kDate = getKolkataDate(currentDate);
  const currentMinutes = kDate.getHours() * 60 + kDate.getMinutes();

  if (item.availabilityType === "DINNER") {
    const start = 18 * 60; // 18:00 (6:00 PM)
    const end = 23 * 60;   // 23:00 (11:00 PM)
    return currentMinutes >= start && currentMinutes <= end;
  }

  if (item.availabilityType === "TIME_SLOT" && item.startTime && item.endTime) {
    const start = timeToMinutes(item.startTime);
    const end = timeToMinutes(item.endTime);
    return currentMinutes >= start && currentMinutes <= end;
  }

  return true;
}

/**
 * Formats availability message for display on the product card
 */
export function getAvailabilityDisplay(item: {
  availabilityType: AvailabilityType;
  startTime?: string;
  endTime?: string;
}, currentDate: Date = new Date()): AvailabilityStatus {
  const available = isItemAvailable(item, currentDate);

  if (item.availabilityType === "ALWAYS") {
    return {
      isAvailable: true,
      timingLabel: "All Day Available",
    };
  }

  if (item.availabilityType === "DINNER") {
    return {
      isAvailable: available,
      statusText: available ? "Available Now (Dinner)" : "Available during Dinner · 6:00 PM – 11:00 PM",
      timingLabel: "Dinner Only (6:00 PM – 11:00 PM)",
    };
  }

  if (item.availabilityType === "TIME_SLOT" && item.startTime && item.endTime) {
    // Format friendly time
    const formatTime = (time: string) => {
      const [h, m] = time.split(":").map(Number);
      const period = h >= 12 ? "PM" : "AM";
      const displayH = h % 12 === 0 ? 12 : h % 12;
      const displayM = m === 0 ? "" : `:${m.toString().padStart(2, "0")}`;
      return `${displayH}${displayM} ${period}`;
    };

    const range = `${formatTime(item.startTime)} – ${formatTime(item.endTime)}`;
    const kDate = getKolkataDate(currentDate);
    const currentMinutes = kDate.getHours() * 60 + kDate.getMinutes();
    const startMin = timeToMinutes(item.startTime);

    let statusMsg = `Available ${range}`;
    if (!available && currentMinutes < startMin) {
      statusMsg = `Available from ${formatTime(item.startTime)}`;
    }

    return {
      isAvailable: available,
      statusText: statusMsg,
      timingLabel: range,
    };
  }

  return {
    isAvailable: true,
  };
}
