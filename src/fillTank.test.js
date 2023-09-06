'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should return nothing', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const result = fillTank(customer, 100, 2);

    expect(result).not.toBeDefined();
  });

  it('should update the customer object', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100, 2);

    expect(customer).toEqual({
      money: 1800,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    });
  });

  it('should fill full tank if the amount is omitted', () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100);

    expect(customer).toEqual({
      money: 800,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should fill full tank if the amount > maxTankCapacity', () => {
    const customer = {
      money: 7000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100, 42);

    expect(customer).toEqual({
      money: 3800,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should return only the possible amount of fuel'
      + ' that client can pay for', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 200, 12);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18,
      },
    });
  });

  it('should round the amount of fuel to tenths', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 210, 10);

    expect(customer).toEqual({
      money: 5,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 17.5,
      },
    });
  }
  );

  it("shouldn't add any fuel if the amount < 2", () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 210, 1);

    expect(customer).toEqual({
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it('should round the amount of money to hundredth', () => {
    const customer = {
      money: 250,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 2.1);

    expect(customer).toEqual({
      money: 182.8,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });
});
