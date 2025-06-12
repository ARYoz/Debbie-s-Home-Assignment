package Tagil07.ArtSystem;

import Tagil07.ArtSystem.ElementVisitor;

import java.util.ArrayList;
import java.util.List;

public class Island extends Element {
    private String name;
    private double diameter;
    private List<Element> children;

    public Island(String name, double diameter, String path) {
        super(diameter, diameter, path);
        this.name = name;
        this.diameter = diameter;
        this.children = new ArrayList<>();
    }

    public void addChild(Element child) {
        // Only allow terrestrial or amphibian elements
        Habitat h = child.getHabitat();
        if (h == Habitat.TERRESTRIAL || h == Habitat.AMPHIBIAN) {
            children.add(child);
        } else {
            System.out.println(getName() + " cannot contain " + child.getName());
        }
    }

    public List<Element> getChildren() {
        return children;
    }

    // Area = π * (diameter/2)^2 (circle)
    public double getArea() {
        return Math.PI * Math.pow(diameter / 2.0, 2);
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
    public void accept(ElementVisitor visitor) {
        visitor.visit(this);
        for (Element child : children) {
            child.accept(visitor);
        }
    }
}

