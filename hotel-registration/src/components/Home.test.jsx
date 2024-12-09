import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "./Home";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Mock Firestore methods
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

jest.mock("../firebase", () => ({
  db: {}, // Mock the database instance
}));

describe("Home Component", () => {
  beforeEach(() => {
    // Reset mock implementations before each test
    jest.clearAllMocks();
  });

  test("renders heading and child components", async () => {
    // Mock Firestore data
    const mockRooms = [
      { id: "1", name: "Deluxe Suite", price: 200 },
      { id: "2", name: "Economy Room", price: 100 },
    ];

    getDocs.mockResolvedValue({
      docs: mockRooms.map((room) => ({
        id: room.id,
        data: () => room,
      })),
    });

    render(<Home />);

    // Check for heading
    expect(screen.getByText("Room Listings")).toBeInTheDocument();

    // Wait for rooms to load and child components to render
    await waitFor(() => {
      expect(screen.getByText("Deluxe Suite")).toBeInTheDocument();
      expect(screen.getByText("Economy Room")).toBeInTheDocument();
    });
  });

  test("displays error message on failed data fetch", async () => {
    // Mock Firestore to throw an error
    getDocs.mockRejectedValue(new Error("Firestore fetch failed"));

    render(<Home />);

    // Expect error logged to console (mocked here for clarity)
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching rooms:",
        expect.any(Error)
      );
    });
  });
});
