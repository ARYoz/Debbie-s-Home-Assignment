package ArtSystem;

import java.util.ArrayList;
import java.util.List;

public class Island extends Element {

    private String name;
    private double diameter;
    private String path;
    private List<Element> elements;

    public Island(String name, double diameter, String path) {
        super(diameter, diameter, path);
        this.name = name;
        this.diameter = diameter;
        this.path = path;
        this.elements = new ArrayList<>();
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Habitat getHabitat() {
        return Habitat.AQUATIC;
    }

    @Override
    public double getArea() {
        // שטח מעגל: π * r^2
        double radius = diameter / 2.0;
        return Math.PI * radius * radius;
    }

    // Composite methods
    public void addElement(Element e) {
        if (e.getHabitat() == Habitat.TERRESTRIAL || e.getHabitat() == Habitat.AMPHIBIAN) {
            elements.add(e);
        } else {
            System.out.println(this.path + " cannot contain " + e.getName());
        }
    }

    public void removeElement(Element e) {
        elements.remove(e);
    }

    public List<Element> getElements() {
        return elements;
    }

    // Visitor
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
        for (Element e : elements) {
            e.accept(visitor);
        }
    }
}
