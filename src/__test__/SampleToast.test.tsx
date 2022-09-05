import React from 'react';
import { render, screen } from '@testing-library/react';
import SampleToast from '../components/SampleToast';

const mockEnqueue = jest.fn();

jest.mock('notistack', () => ({
    ...jest.requireActual('notistack'),
    useSnackbar: () => {
        return {
            enqueueSnackbar: mockEnqueue
        };
    }
}));

describe('SampleToast tests', () => {
    it('should call SampleToast correctly', () => {
        const { container } = render(<SampleToast />);
        expect(container).toBeTruthy();
    });
    it('should have class sampleToast', () => {
        const { container } = render(<SampleToast />);
        const button = container.getElementsByClassName('sampleToast');
        expect(button.length).toBe(1);
    });
    it('renders correctly', () => {
        const { container } = render(<SampleToast />);
        expect(container).toMatchSnapshot();;
    });
});