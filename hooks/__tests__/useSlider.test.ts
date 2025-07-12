import { renderHook, act } from '@testing-library/react';
import { useSlider } from '../useSlider';

describe('useSlider', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSlider({ itemsLength: 5 }));

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.isAutoPlaying).toBe(true);
    expect(result.current.isVisible).toBe(true);
    expect(result.current.sliderTransformStyle).toEqual({ transform: 'translateX(-0%)' });
  });

  it('should auto-advance when autoplay is enabled', () => {
    const { result } = renderHook(() => useSlider({ 
      itemsLength: 3,
      autoPlayInterval: 1000,
      autoPlayEnabled: true
    }));

    expect(result.current.currentIndex).toBe(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.currentIndex).toBe(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.currentIndex).toBe(2);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.currentIndex).toBe(0); // Loop back to start
  });

  it('should not auto-advance when autoplay is disabled', () => {
    const { result } = renderHook(() => useSlider({ 
      itemsLength: 3,
      autoPlayInterval: 1000,
      autoPlayEnabled: false
    }));

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.isAutoPlaying).toBe(false);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.currentIndex).toBe(0);
  });

  it('should navigate to next slide and stop autoplay', () => {
    const { result } = renderHook(() => useSlider({ itemsLength: 4 }));

    expect(result.current.isAutoPlaying).toBe(true);

    act(() => {
      result.current.goToNext();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.isAutoPlaying).toBe(false);

    act(() => {
      result.current.goToNext();
    });
    expect(result.current.currentIndex).toBe(2);

    // Test wrap around
    act(() => {
      result.current.goToNext();
      result.current.goToNext();
    });
    expect(result.current.currentIndex).toBe(0);
  });

  it('should navigate to previous slide and stop autoplay', () => {
    const { result } = renderHook(() => useSlider({ itemsLength: 4 }));

    act(() => {
      result.current.goToPrevious();
    });

    expect(result.current.currentIndex).toBe(3); // Wrap to last
    expect(result.current.isAutoPlaying).toBe(false);

    act(() => {
      result.current.goToPrevious();
    });
    expect(result.current.currentIndex).toBe(2);
  });

  it('should go to specific slide', () => {
    const { result } = renderHook(() => useSlider({ itemsLength: 5 }));

    act(() => {
      result.current.goToSlide(3);
    });

    expect(result.current.currentIndex).toBe(3);
    expect(result.current.isAutoPlaying).toBe(false);

    // Test invalid indices
    act(() => {
      result.current.goToSlide(-1);
    });
    expect(result.current.currentIndex).toBe(3); // Should not change

    act(() => {
      result.current.goToSlide(10);
    });
    expect(result.current.currentIndex).toBe(3); // Should not change
  });

  it('should handle close', () => {
    const { result } = renderHook(() => useSlider({ itemsLength: 3 }));

    expect(result.current.isVisible).toBe(true);

    act(() => {
      result.current.handleClose();
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('should pause on mouse enter and resume on mouse leave', () => {
    const { result } = renderHook(() => useSlider({ 
      itemsLength: 3,
      autoPlayEnabled: true 
    }));

    expect(result.current.isAutoPlaying).toBe(true);

    act(() => {
      result.current.handleMouseEnter();
    });
    expect(result.current.isAutoPlaying).toBe(false);

    act(() => {
      result.current.handleMouseLeave();
    });
    expect(result.current.isAutoPlaying).toBe(true);
  });

  it('should not resume autoplay on mouse leave if initially disabled', () => {
    const { result } = renderHook(() => useSlider({ 
      itemsLength: 3,
      autoPlayEnabled: false 
    }));

    expect(result.current.isAutoPlaying).toBe(false);

    act(() => {
      result.current.handleMouseEnter();
    });
    expect(result.current.isAutoPlaying).toBe(false);

    act(() => {
      result.current.handleMouseLeave();
    });
    expect(result.current.isAutoPlaying).toBe(false);
  });

  it('should update transform style based on current index', () => {
    const { result } = renderHook(() => useSlider({ itemsLength: 4 }));

    expect(result.current.sliderTransformStyle).toEqual({ transform: 'translateX(-0%)' });

    act(() => {
      result.current.goToSlide(1);
    });
    expect(result.current.sliderTransformStyle).toEqual({ transform: 'translateX(-100%)' });

    act(() => {
      result.current.goToSlide(2);
    });
    expect(result.current.sliderTransformStyle).toEqual({ transform: 'translateX(-200%)' });

    act(() => {
      result.current.goToSlide(3);
    });
    expect(result.current.sliderTransformStyle).toEqual({ transform: 'translateX(-300%)' });
  });

  it('should not auto-advance when not visible', () => {
    const { result } = renderHook(() => useSlider({ 
      itemsLength: 3,
      autoPlayInterval: 1000
    }));

    act(() => {
      result.current.handleClose();
    });

    expect(result.current.isVisible).toBe(false);
    expect(result.current.currentIndex).toBe(0);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.currentIndex).toBe(0); // Should not advance
  });

  it('should not auto-advance when only one item', () => {
    const { result } = renderHook(() => useSlider({ 
      itemsLength: 1,
      autoPlayInterval: 1000
    }));

    expect(result.current.currentIndex).toBe(0);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.currentIndex).toBe(0);
  });

  it('should clean up interval on unmount', () => {
    const { unmount } = renderHook(() => useSlider({ 
      itemsLength: 3,
      autoPlayInterval: 1000
    }));

    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
}); 