import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { EmptyState } from '../src/components/EmptyState';
import { StatCard, BudgetCard, HealthCard } from '../src/components/Cards';

describe('UI components', () => {
  it('renders EmptyState with title and CTA', () => {
    render(<EmptyState title="No data" subtitle="Please add" cta="Add" />);
    expect(screen.getByText('No data')).toBeTruthy();
    expect(screen.getByText('Add')).toBeTruthy();
  });

  it('StatCard renders and triggers CTA', () => {
    const onPress = jest.fn();
    render(<StatCard title="Health Score" value="78" cta="View" onPress={onPress} />);
    fireEvent.press(screen.getByText('View'));
    expect(onPress).toHaveBeenCalled();
  });

  it('BudgetCard shows percent', () => {
    render(<BudgetCard category="Makanan" spent="Rp1.250.000" limit="Rp1.500.000" percent={0.833} />);
    expect(screen.getByText(/Makanan/)).toBeTruthy();
    expect(screen.getByText(/83%/)).toBeTruthy();
  });

  it('HealthCard shows summary and handles press', () => {
    const onPress = jest.fn();
    render(<HealthCard summary="Gula minggu ini 230g" cta="Target <2x" onPress={onPress} />);
    fireEvent.press(screen.getByText('Target <2x'));
    expect(onPress).toHaveBeenCalled();
  });
});

