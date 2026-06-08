import { describe, expect, it } from 'vitest';
import { parseDefault } from '../src/internal/parse-default';
import { parseDefaultIntercooler } from '../src/internal/parse-default-Intercooler';
import { parseDefaultOptional } from '../src/internal/parse-default-optional';
import { parseDrivetrainSwap } from '../src/internal/parse-drivetrain-swap';
import { parseEngineSwap } from '../src/internal/parse-engine-swap';
import { parseRestrictorPlate } from '../src/internal/parse-restrictor-plate';
import { parseStockNonStock } from '../src/internal/parse-stock-non-stock';
import { parseTurbo } from '../src/internal/parse-turbo';

function makeView(grade: number): DataView {
  const buf = new ArrayBuffer(4);
  const view = new DataView(buf);
  view.setInt32(0, grade, true);
  return view;
}

describe('parseDefault', () => {
  it('Invalid grade', () => expect(parseDefault(makeView(-1), 0)).toBe('Invalid'));
  it('Stock', () => expect(parseDefault(makeView(0), 0)).toBe('Stock'));
  it('Street', () => expect(parseDefault(makeView(1), 0)).toBe('Street'));
  it('Sport', () => expect(parseDefault(makeView(2), 0)).toBe('Sport'));
  it('Race', () => expect(parseDefault(makeView(3), 0)).toBe('Race'));
  it('Invalid grade', () => expect(parseDefault(makeView(4), 0)).toBe('Invalid'));
});

describe('parseDefaultOptional', () => {
  it('null for absent upgrade', () => expect(parseDefaultOptional(makeView(-1), 0)).toBeNull());
  it('Stock', () => expect(parseDefaultOptional(makeView(0), 0)).toBe('Stock'));
  it('Street', () => expect(parseDefaultOptional(makeView(1), 0)).toBe('Street'));
  it('Sport', () => expect(parseDefaultOptional(makeView(2), 0)).toBe('Sport'));
  it('Race', () => expect(parseDefaultOptional(makeView(3), 0)).toBe('Race'));
  it('Invalid upgrade grade', () => expect(parseDefaultOptional(makeView(4), 0)).toBe('Invalid'));
});

describe('parseDefaultIntercooler', () => {
  it('No Intercooler', () => expect(parseDefaultIntercooler(makeView(-1), 0)).toBe('No Intercooler'));
  it('Stock', () => expect(parseDefaultIntercooler(makeView(0), 0)).toBe('Stock (Street if No Intercooler possible)'));
  it('Street', () => expect(parseDefaultIntercooler(makeView(1), 0)).toBe('Street (Sport if No Intercooler possible)'));
  it('Sport', () => expect(parseDefaultIntercooler(makeView(2), 0)).toBe('Sport (Race if No Intercooler possible)'));
  it('Race', () => expect(parseDefaultIntercooler(makeView(3), 0)).toBe('Race'));
  it('Street (if "No Intercooler" possible)', () => expect(parseDefaultIntercooler(makeView(0), 0)).toBe('Stock (Street if No Intercooler possible)'));
  it('Sport (if "No Intercooler" possible)', () => expect(parseDefaultIntercooler(makeView(1), 0)).toBe('Street (Sport if No Intercooler possible)'));
  it('Race (if "No Intercooler" possible)', () => expect(parseDefaultIntercooler(makeView(2), 0)).toBe('Sport (Race if No Intercooler possible)'));
  it('Invalid intercooler option', () => expect(parseDefaultIntercooler(makeView(4), 0)).toBe('Invalid'));
});

describe('parseRestrictorPlate', () => {
  it('null for absent restrictor plate upgrade', () => expect(parseRestrictorPlate(makeView(-1), 0)).toBeNull());
  it('Stock', () => expect(parseRestrictorPlate(makeView(0), 0)).toBe('Stock'));
  it('No Restrictor Plate', () => expect(parseRestrictorPlate(makeView(1), 0)).toBe('No Restrictor Plate'));
  it('Remove Restrictor', () => expect(parseRestrictorPlate(makeView(2), 0)).toBe('Remove Restrictor'));
  it('Invalid restrictor plate option', () => expect(parseRestrictorPlate(makeView(3), 0)).toBe('Invalid'));
});

describe('parseTurbo', () => {
  it('null for absent turbo upgrade', () => expect(parseTurbo(makeView(-1), 0)).toBeNull());
  it('Stock', () => expect(parseTurbo(makeView(0), 0)).toBe('Stock'));
  it('Street', () => expect(parseTurbo(makeView(1), 0)).toBe('Street (Race w/ Anti-Lag if only option)'));
  it('Sport', () => expect(parseTurbo(makeView(2), 0)).toBe('Sport'));
  it('Race', () => expect(parseTurbo(makeView(3), 0)).toBe('Race'));
  it('Race with Anti-Lag', () => expect(parseTurbo(makeView(4), 0)).toBe('Race with Anti-Lag'));
  it('Race with Anti-Lag (if only that option available)', () => expect(parseTurbo(makeView(1), 0)).toBe('Street (Race w/ Anti-Lag if only option)'));
  it('Invalid turbo option', () => expect(parseTurbo(makeView(5), 0)).toBe('Invalid'));
});

describe('parseEngineSwap', () => {
  it('Stock', () => expect(parseEngineSwap(makeView(0), 0)).toBe('Stock'));
  it('1st Non-Stock', () => expect(parseEngineSwap(makeView(1), 0)).toBe('1st Non-Stock'));
  it('2nd Non-Stock', () => expect(parseEngineSwap(makeView(2), 0)).toBe('2nd Non-Stock'));
  it('3rd Non-Stock', () => expect(parseEngineSwap(makeView(3), 0)).toBe('3rd Non-Stock'));
  it('4th Non-Stock', () => expect(parseEngineSwap(makeView(4), 0)).toBe('4th Non-Stock'));
  it('5th Non-Stock', () => expect(parseEngineSwap(makeView(5), 0)).toBe('5th Non-Stock'));
  it('6th Non-Stock', () => expect(parseEngineSwap(makeView(6), 0)).toBe('6th Non-Stock'));
  it('7th Non-Stock', () => expect(parseEngineSwap(makeView(7), 0)).toBe('7th Non-Stock'));
  it('8th Non-Stock', () => expect(parseEngineSwap(makeView(8), 0)).toBe('8th Non-Stock'));
  it('9th Non-Stock', () => expect(parseEngineSwap(makeView(9), 0)).toBe('9th Non-Stock'));
  it('Invalid engine swap', () => expect(parseEngineSwap(makeView(10), 0)).toBe('Invalid'));
});

describe('parseDrivetrainSwap', () => {
  it('Stock', () => expect(parseDrivetrainSwap(makeView(0), 0)).toBe('Stock'));
  it('RWD', () => expect(parseDrivetrainSwap(makeView(1), 0)).toBe('RWD (AWD if only option)'));
  it('AWD', () => expect(parseDrivetrainSwap(makeView(2), 0)).toBe('AWD'));
  it('AWD (for RWD cars)', () => expect(parseDrivetrainSwap(makeView(1), 0)).toBe('RWD (AWD if only option)'));
  it('Invalid drivetrain swap', () => expect(parseDrivetrainSwap(makeView(3), 0)).toBe('Invalid'));
});

describe('parseStockNonStock', () => {
  it('Stock', () => expect(parseStockNonStock(makeView(0), 0)).toBe('Stock'));
  it('Non-Stock', () => expect(parseStockNonStock(makeView(1), 0)).toBe('Non-Stock'));
});
